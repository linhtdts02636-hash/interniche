package com.interniche.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO đăng ký — tách riêng để tái sử dụng và nhất quán với niche/content dto/
// @NotBlank: không cho null / rỗng / toàn khoảng trắng — khác @NotNull (cho phép "")
// @Size(max=50): khớp VARCHAR(50) của user_name trong DDL
public record RegisterRequest(
        @NotBlank String idToken,
        @NotBlank @Size(max = 50) String username) {}
