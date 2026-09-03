package com.interniche.member;

import com.interniche.common.exception.ConflictException;
import com.interniche.common.exception.NotFoundException;
import com.interniche.niche.NicheDAO;
import org.springframework.stereotype.Service;

import java.util.List;

// Service xu ly join/leave/list member cua niche
@Service
public class MemberService {

    private final MemberDAO memberDAO;
    private final NicheDAO nicheDAO;

    public MemberService(MemberDAO memberDAO, NicheDAO nicheDAO) {
        this.memberDAO = memberDAO;
        this.nicheDAO = nicheDAO;
    }

    // Liet ke tat ca member trong niche — kiem tra niche ton tai truoc
    public List<Member> listMembers(Integer nichId) {
        if (nicheDAO.findById(nichId).isEmpty()) {
            throw new NotFoundException("Niche not found");
        }
        return memberDAO.findByNichId(nichId);
    }

    // Tham gia niche — 404 neu niche khong ton tai, 409 neu da la member
    public Member join(Integer nichId, Integer userId) {
        if (nicheDAO.findById(nichId).isEmpty()) {
            throw new NotFoundException("Niche not found");
        }
        if (memberDAO.existsByUserIdAndNichId(userId, nichId)) {
            throw new ConflictException("Already a member");
        }
        Member member = new Member(userId, nichId);
        return memberDAO.save(member);
    }

    // Roi niche — 404 neu chua la member
    public void leave(Integer nichId, Integer userId) {
        MemberId id = new MemberId(userId, nichId);
        if (!memberDAO.existsById(id)) {
            throw new NotFoundException("Not a member of this niche");
        }
        memberDAO.deleteById(id);
    }
}
