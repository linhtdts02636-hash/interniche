package com.interniche.auth.dto;

import jakarta.validation.constraints.NotBlank;

// DTO đăng nhập — chỉ cần idToken từ Firebase
public record LoginRequest(@NotBlank String idToken) {}
