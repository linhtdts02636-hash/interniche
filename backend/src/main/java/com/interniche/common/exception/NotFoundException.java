package com.interniche.common.exception;

// GlobalExceptionHandler bắt và đổi thành HTTP status + JSON {error, code, timestamp}.
// Service KHÔNG bao giờ tự build JSON hay set status — tách biệt logic và HTTP.

public class NotFoundException extends RuntimeException {
    // RuntimeException: không buộc try/catch ở nơi gọi (checked exception sẽ làm code rườm)
    public NotFoundException(String message) {
        super(message);
    }
}
