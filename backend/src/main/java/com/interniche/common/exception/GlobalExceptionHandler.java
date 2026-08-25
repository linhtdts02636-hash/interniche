package com.interniche.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

// @RestControllerAdvice: "mọi exception ném ra từ BẤT KỲ controller nào đều chạy qua đây"
// -> xử lý lỗi tập trung 1 nơi, thay cho try/catch lặp lại ở từng endpoint (như DevClimb)
// Luồng: Service throw NotFoundException -> lan lên -> Spring thấy chưa ai catch
//        -> gọi @ExceptionHandler khớp loại -> trả ResponseEntity chuẩn.
@RestControllerAdvice
public class GlobalExceptionHandler {

    private Map<String, Object> body(int code, String error) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("error", error);
        map.put("code", code);
        map.put("timestamp", Instant.now().toString());
        return map;
    }

    @ExceptionHandler(NotFoundException.class) // NotFoundException -> HTTP 404
    public ResponseEntity<Map<String, Object>> handleNotFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body(404, ex.getMessage()));
    }

    @ExceptionHandler(ConflictException.class) // ConflictException -> HTTP 409
    public ResponseEntity<Map<String, Object>> handleConflict(ConflictException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body(409, ex.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class) // UnauthorizedException -> HTTP 401
    public ResponseEntity<Map<String, Object>> handleUnauthorized(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body(401, ex.getMessage()));
    }

    // @Valid thất bại (vd @NotBlank vi phạm) -> lấy message lỗi đầu tiên trả về
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");
        return ResponseEntity.badRequest().body(body(400, message));
    }

    // Body JSON gửi lên sai cú pháp (không parse được) -> 400
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleUnreadable(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(body(400, "Malformed request body"));
    }

    // Khai cuối cùng — hứng mọi thứ còn lại (lỗi bất ngờ) -> 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return ResponseEntity.internalServerError().body(body(500, ex.getMessage()));
    }
}
