package com.interniche.auth.dto;

import jakarta.validation.constraints.NotBlank;

// DTO báo lỗi từ frontend — code bắt buộc, message có thể null
public record ClientErrorRequest(@NotBlank String code, String message) {}
