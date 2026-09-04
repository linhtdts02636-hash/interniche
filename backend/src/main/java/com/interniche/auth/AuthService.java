package com.interniche.auth;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.interniche.common.exception.ConflictException;
import com.interniche.common.exception.NotFoundException;
import com.interniche.common.exception.UnauthorizedException;
import com.interniche.user.User;
import com.interniche.user.UserDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

// Service chứa toàn bộ business logic của auth — Controller chỉ nhận request và trả response
@Service // đánh dấu bean để Spring quản lý và tiêm vào nơi cần (AuthController)
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserDAO userDAO;

    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public Map<String, Object> register(String idToken, String username) {
        FirebaseToken decoded = verify(idToken);

       
        if (userDAO.findByFirebaseUid(decoded.getUid()).isPresent()) {
            throw new ConflictException("User already exists");
        }
        if (userDAO.findByUserName(username).isPresent()) {
            throw new ConflictException("Username already taken");
        }

        User user = new User();
        user.setUserName(username.trim());
        user.setUserEmail(decoded.getEmail()); 
        user.setFirebaseUid(decoded.getUid());
        user.setUserJoinedAt(LocalDateTime.now());
        user.setUserIsActive(true);  
        user.setUserIsAdmin(false);
        userDAO.save(user); //

        log.info("User registered: userId={}, username={}", user.getUserId(), user.getUserName());
        return profile(user);
    }

    // Login = verify token + tìm user theo uid. KHÔNG kiểm tra mật khẩu ở đây —
    // Firebase lo phần mật khẩu, backend chỉ xác minh "token này thật chứ không phải bịa"
    public Map<String, Object> login(String idToken) {
        FirebaseToken decoded = verify(idToken);
        User user = userDAO.findByFirebaseUid(decoded.getUid())
                .orElseThrow(() -> new NotFoundException("User not found. Please register first."));
        return profile(user);
    }

    public Map<String, Object> me(Integer userId) {
        return profile(userDAO.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found")));
    }

    // verifyIdToken(): kiểm tra chữ ký số JWT bằng public key của Google + hạn dùng (exp).
    // Token giả / hết hạn / sai project -> FirebaseAuthException -> mình đổi thành UnauthorizedException (401).
    // Đây là điểm DỊCH exception: lỗi cụ thể của Firebase được gói lại thành exception chung của app.
    private FirebaseToken verify(String idToken) {
        if (idToken == null || idToken.isBlank()) {
            throw new UnauthorizedException("idToken is required");
        }
        try {
            return FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (FirebaseAuthException e) {
            log.warn("Token verification failed: {} - {}", e.getAuthErrorCode(), e.getMessage());
            throw new UnauthorizedException("Invalid Firebase token");
        }
    }

    // LinkedHashMap giữ thứ tự key khi in JSON (Map.of thường không đảm bảo thứ tự)
    private Map<String, Object> profile(User user) {
        Map<String, Object> profile = new LinkedHashMap<>();
        profile.put("userId", user.getUserId());
        profile.put("userName", user.getUserName());
        profile.put("userEmail", user.getUserEmail());
        profile.put("userAvatar", user.getUserAvatar());
        profile.put("userIsAdmin", user.getUserIsAdmin());
        return profile;
    }
}
