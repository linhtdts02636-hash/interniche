package com.interniche.comment;

import com.interniche.comment.dto.CreateCommentRequest;
import com.interniche.comment.dto.UpdateCommentRequest;
import com.interniche.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller cho CRUD comment — chi author duoc sua/xoa
@RestController
public class CommentController {

    private static final String SESSION_USER_ID = "userId";

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Tao comment hoac reply — POST /api/v1/contents/{contId}/comments
    // Body: {commBody, parentId} — parentId null la comment goc
    @PostMapping("/api/v1/contents/{contId}/comments")
    public Comment create(@PathVariable Integer contId,
                          @Valid @RequestBody CreateCommentRequest request,
                          HttpSession session) {
        Integer userId = currentUserId(session);
        return commentService.create(contId, request.commBody(), request.parentId(), userId);
    }

    // List comment cua 1 post — flat list, frontend build cay qua parentId
    @GetMapping("/api/v1/contents/{contId}/comments")
    public List<Comment> listByContent(@PathVariable Integer contId) {
        return commentService.listByContent(contId);
    }

    // Lay 1 comment
    @GetMapping("/api/v1/comments/{id}")
    public Comment getById(@PathVariable Integer id) {
        return commentService.getById(id);
    }

    // Sua — chi author, set editedAt = now
    @PutMapping("/api/v1/comments/{id}")
    public Comment update(@PathVariable Integer id,
                          @Valid @RequestBody UpdateCommentRequest request,
                          HttpSession session) {
        Integer userId = currentUserId(session);
        return commentService.update(id, request.commBody(), userId);
    }

    // Xoa — chi author, reply cascade do FK
    @DeleteMapping("/api/v1/comments/{id}")
    public void delete(@PathVariable Integer id, HttpSession session) {
        Integer userId = currentUserId(session);
        commentService.delete(id, userId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
