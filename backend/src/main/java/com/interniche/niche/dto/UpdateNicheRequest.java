package com.interniche.niche.dto;

import jakarta.validation.constraints.Size;

// DTO sửa niche — tất cả optional, chỉ gửi field muốn đổi
// Không dùng @NotBlank để cho phép bỏ trống field không cần sửa
public record UpdateNicheRequest(
        @Size(max = 50) String nichName,
        String nichBanner,
        String nichAvatar,
        Boolean nichIsPublic) {}
