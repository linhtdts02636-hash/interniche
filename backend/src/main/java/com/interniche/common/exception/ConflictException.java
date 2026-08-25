package com.interniche.common.exception;

// 409 Conflict — xung đột dữ liệu: username/uid đã tồn tại
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
