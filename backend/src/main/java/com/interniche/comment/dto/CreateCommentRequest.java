package com.interniche.comment.dto;

import jakarta.validation.constraints.NotBlank;

// DTO tao comment — parentId null la comment goc, co gia tri la reply
public record CreateCommentRequest(
        @NotBlank String commBody,
        Integer parentId) {}
