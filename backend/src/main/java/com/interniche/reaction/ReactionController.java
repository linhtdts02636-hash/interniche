package com.interniche.reaction;

import com.interniche.common.exception.UnauthorizedException;
import com.interniche.reaction.dto.CreateReactionRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller cho reaction — Cach B: 2 bo endpoint rieng cho post va comment
@RestController
public class ReactionController {

    private static final String SESSION_USER_ID = "userId";

    private final ReactionService reactionService;

    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    // React post — POST /api/v1/contents/{contId}/reactions {reacType: like|dislike}
    // Upsert: da like roi like lai -> idempotent, doi sang dislike -> update
    @PostMapping("/api/v1/contents/{contId}/reactions")
    public Reaction reactToContent(@PathVariable Integer contId,
                                   @Valid @RequestBody CreateReactionRequest request,
                                   HttpSession session) {
        Integer userId = currentUserId(session);
        return reactionService.reactToContent(contId, request.reacType(), userId);
    }

    // Xoa reaction cua minh tren post
    @DeleteMapping("/api/v1/contents/{contId}/reactions")
    public void unreactFromContent(@PathVariable Integer contId, HttpSession session) {
        Integer userId = currentUserId(session);
        reactionService.unreactFromContent(contId, userId);
    }

    // List reaction cua post
    @GetMapping("/api/v1/contents/{contId}/reactions")
    public List<Reaction> listByContent(@PathVariable Integer contId) {
        return reactionService.listByContent(contId);
    }

    // React comment — POST /api/v1/comments/{commId}/reactions
    @PostMapping("/api/v1/comments/{commId}/reactions")
    public Reaction reactToComment(@PathVariable Integer commId,
                                   @Valid @RequestBody CreateReactionRequest request,
                                   HttpSession session) {
        Integer userId = currentUserId(session);
        return reactionService.reactToComment(commId, request.reacType(), userId);
    }

    // Xoa reaction cua minh tren comment
    @DeleteMapping("/api/v1/comments/{commId}/reactions")
    public void unreactFromComment(@PathVariable Integer commId, HttpSession session) {
        Integer userId = currentUserId(session);
        reactionService.unreactFromComment(commId, userId);
    }

    // List reaction cua comment
    @GetMapping("/api/v1/comments/{commId}/reactions")
    public List<Reaction> listByComment(@PathVariable Integer commId) {
        return reactionService.listByComment(commId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
