package com.interniche.content;

import com.interniche.common.exception.UnauthorizedException;
import com.interniche.content.dto.CreateContentRequest;
import com.interniche.content.dto.ContentWithAuthor;
import com.interniche.content.dto.UpdateContentRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller cho CRUD post/creation (content) — mọi endpoint cần đăng nhập
@RestController
@RequestMapping("/api/v1/contents")
public class ContentController {

    private static final String SESSION_USER_ID = "userId";

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping
    public Content create(@Valid @RequestBody CreateContentRequest request, HttpSession session) {
        Integer userId = currentUserId(session);
        return contentService.create(
                request.contTitle(), request.contBody(), request.contType(),
                request.nichId(), userId);
    }

    // List post theo niche: GET /api/v1/contents?nichId=1
    // Nếu không có nichId -> trả toàn bộ
    @GetMapping
    public List<ContentWithAuthor> list(@RequestParam(required = false) Integer nichId) {
        if (nichId != null) {
            return contentService.listByNiche(nichId);
        }
        return contentService.listAll();
    }

    @GetMapping("/{id}")
    public Content getById(@PathVariable Integer id) {
        return contentService.getById(id);
    }

    @PutMapping("/{id}")
    public Content update(@PathVariable Integer id,
                          @Valid @RequestBody UpdateContentRequest request,
                          HttpSession session) {
        Integer userId = currentUserId(session);
        return contentService.update(
                id, request.contTitle(), request.contBody(), request.contType(), userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id, HttpSession session) {
        Integer userId = currentUserId(session);
        contentService.delete(id, userId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
