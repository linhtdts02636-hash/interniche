package com.interniche.niche;

import com.interniche.common.exception.UnauthorizedException;
import com.interniche.niche.dto.CreateNicheRequest;
import com.interniche.niche.dto.UpdateNicheRequest;
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

// Controller cho CRUD niche — mọi endpoint cần đăng nhập (check session)
@RestController
@RequestMapping("/api/v1/niches")
public class NicheController {

    private static final String SESSION_USER_ID = "userId";

    private final NicheService nicheService;

    public NicheController(NicheService nicheService) {
        this.nicheService = nicheService;
    }

    @PostMapping
    public Niche create(@Valid @RequestBody CreateNicheRequest request, HttpSession session) {
        Integer userId = currentUserId(session);
        return nicheService.create(
                request.nichName(), request.nichBanner(), request.nichAvatar(),
                request.nichIsPublic(), userId);
    }

    @GetMapping
    public List<Niche> list() {
        return nicheService.listAll();
    }

    @GetMapping("/{id}")
    public Niche getById(@PathVariable Integer id) {
        return nicheService.getById(id);
    }

    @PutMapping("/{id}")
    public Niche update(@PathVariable Integer id,
                        @Valid @RequestBody UpdateNicheRequest request,
                        HttpSession session) {
        Integer userId = currentUserId(session);
        return nicheService.update(
                id, request.nichName(), request.nichBanner(), request.nichAvatar(),
                request.nichIsPublic(), userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id, HttpSession session) {
        Integer userId = currentUserId(session);
        nicheService.delete(id, userId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
