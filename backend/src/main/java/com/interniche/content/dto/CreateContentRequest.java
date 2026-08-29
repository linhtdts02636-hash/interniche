package com.interniche.content.dto;

import com.interniche.content.ContentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// DTO tạo post/creation — tách riêng để tái sử dụng
public record CreateContentRequest(
        @NotBlank @Size(max = 100) String contTitle, // khớp VARCHAR(100) của cont_title
        @NotBlank String contBody, // MEDIUMTEXT không giới hạn nhưng vẫn @NotBlank để tránh rỗng
        @NotNull ContentType contType, // post hoặc creation — @NotNull khác @NotBlank (enum không phải chuỗi rỗng)
        @NotNull Integer nichId) {}
