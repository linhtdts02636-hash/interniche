package com.interniche.auth;

import com.interniche.auth.dto.ClientErrorRequest;
import com.interniche.auth.dto.LoginRequest;
import com.interniche.auth.dto.RegisterRequest;
import com.interniche.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// Controller xử lý đăng nhập, đăng ký, đăng xuất (Spring Boot thay cho servlet thuần ở DevClimb)
@RestController // = @Controller + mọi return value tự chuyển thành JSON (không cần ResponseUtil)
@RequestMapping("/api/v1/auth") // prefix chung cho tất cả endpoint bên dưới
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private static final String SESSION_USER_ID = "userId";

    private final AuthService authService;

    // Dependency Injection: Spring tự tiêm AuthService vào constructor (không cần new, không cần @Autowired
    // vì chỉ có 1 constructor)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // @RequestBody: đọc JSON từ body -> Jackson tự map vào DTO
    // @Valid: kích hoạt validation trong DTO (@NotBlank...); sai -> MethodArgumentNotValidException -> GlobalExceptionHandler trả 400
    // HttpSession: Spring tạo/lấy session sẵn; Tomcat gửi cookie JSESSIONID về client
    @PostMapping("/register")
    public Map<String, Object> register(@Valid @RequestBody RegisterRequest request, HttpSession session) {
        Map<String, Object> profile = authService.register(request.idToken(), request.username());
        establishSession(session, (Integer) profile.get("userId"));
        return profile; // return trực tiếp -> Spring tự serialize thành JSON
    }

    @PostMapping("/login")
    public Map<String, Object> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        Map<String, Object> profile = authService.login(request.idToken());
        establishSession(session, (Integer) profile.get("userId"));
        return profile;
    }

    // Đọc userId từ session; chưa đăng nhập -> throw -> 401 (xử lý tập trung ở GlobalExceptionHandler)
    @GetMapping("/me")
    public Map<String, Object> me(HttpSession session) {
        Integer userId = currentUserId(session);
        return authService.me(userId); // re-fetch từ DB để profile luôn mới nhất
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate(); // xoá session phía server -> JSESSIONID cũ vô dụng ngay cả khi client giữ
        return Map.of("message", "Logged out"); // Map.of tạo map bất biến ngắn gọn
    }

    // Endpoint nhận lỗi Firebase từ frontend để log lại phục vụ debug (fire-and-forget, trả 204 no content)
    @PostMapping("/client-errors")
    public ResponseEntity<Void> logClientError(@Valid @RequestBody ClientErrorRequest request) {
        log.warn("Client error [{}]: {}", request.code(), request.message());
        return ResponseEntity.noContent().build();
    }

    private void establishSession(HttpSession session, Integer userId) {
        session.setAttribute(SESSION_USER_ID, userId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
