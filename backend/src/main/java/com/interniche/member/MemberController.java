package com.interniche.member;

import com.interniche.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller cho member — join/leave/list member cua niche
@RestController
@RequestMapping("/api/v1/niches/{id}/members")
public class MemberController {

    private static final String SESSION_USER_ID = "userId";

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public List<Member> list(@PathVariable Integer id, HttpSession session) {
        currentUserId(session); // yeu cau dang nhap moi duoc xem member
        return memberService.listMembers(id);
    }

    @PostMapping
    public Member join(@PathVariable Integer id, HttpSession session) {
        Integer userId = currentUserId(session);
        return memberService.join(id, userId);
    }

    @DeleteMapping
    public void leave(@PathVariable Integer id, HttpSession session) {
        Integer userId = currentUserId(session);
        memberService.leave(id, userId);
    }

    private Integer currentUserId(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }
        return userId;
    }
}
