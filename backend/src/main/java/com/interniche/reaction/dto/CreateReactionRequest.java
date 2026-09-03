package com.interniche.reaction.dto;

import com.interniche.reaction.ReactionType;
import jakarta.validation.constraints.NotNull;

// DTO tao/doi reaction — contId/commId lay tu URL (Cach B), body chi co type
public record CreateReactionRequest(@NotNull ReactionType reacType) {}
