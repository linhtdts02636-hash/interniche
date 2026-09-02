package com.interniche.comment.dto;

import jakarta.validation.constraints.NotBlank;

// DTO sua comment — chi gui body moi
public record UpdateCommentRequest(@NotBlank String commBody) {}
