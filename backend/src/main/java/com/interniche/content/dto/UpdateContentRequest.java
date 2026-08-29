package com.interniche.content.dto;

import com.interniche.content.ContentType;
import jakarta.validation.constraints.Size;

// DTO sửa post — tất cả optional, chỉ gửi field muốn đổi
public record UpdateContentRequest(
        @Size(max = 100) String contTitle,
        String contBody,
        ContentType contType) {}
