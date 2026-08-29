package com.interniche.niche.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO tạo niche — tách riêng để tái sử dụng và dễ test
// @NotBlank: không cho rỗng / toàn khoảng trắng — khác @NotNull (cho phép "")
// @Size(max=50): khớp VARCHAR(50) của nich_name trong DDL
public record CreateNicheRequest(
        @NotBlank @Size(max = 50) String nichName,
        String nichBanner,
        String nichAvatar,
        Boolean nichIsPublic) {}
