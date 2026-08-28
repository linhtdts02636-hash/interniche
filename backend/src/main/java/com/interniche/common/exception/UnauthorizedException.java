package com.interniche.common.exception;

// 401 Unauthorized — chưa đăng nhập / token sai hoặc hết hạn
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }
}
