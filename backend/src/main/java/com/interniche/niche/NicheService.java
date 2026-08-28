package com.interniche.niche;

import com.interniche.common.exception.ConflictException;
import com.interniche.common.exception.NotFoundException;
import com.interniche.member.Member;
import com.interniche.member.MemberDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

// Service xử lý logic tạo/sửa/xoá niche
@Service
public class NicheService {

    private final NicheDAO nicheDAO;
    private final MemberDAO memberDAO;

    public NicheService(NicheDAO nicheDAO, MemberDAO memberDAO) {
        this.nicheDAO = nicheDAO;
        this.memberDAO = memberDAO;
    }

    // Tạo niche — Yêu cầu 1: set nich_ownerid = người tạo (sessionUserId)
    // Đồng thời auto thêm owner vào bảng member để owner cũng là thành viên
    @Transactional
    public Niche create(String nichName, String nichBanner, String nichAvatar,
                        Boolean nichIsPublic, Integer sessionUserId) {
        if (nicheDAO.findByNichName(nichName).isPresent()) {
            throw new ConflictException("Niche name already taken");
        }

        Niche niche = new Niche();
        niche.setNichName(nichName.trim());
        niche.setNichBanner(nichBanner);
        niche.setNichAvatar(nichAvatar);
        niche.setNichOwnerId(sessionUserId); // ← YÊU CẦU 1: gán owner = người đăng nhập
        niche.setNichCreatedAt(LocalDateTime.now());
        niche.setNichIsActive(true);
        niche.setNichIsPublic(nichIsPublic != null ? nichIsPublic : true);
        nicheDAO.save(niche);

        // Auto thêm owner vào member — owner vừa là chủ vừa là thành viên
        Member member = new Member(sessionUserId, niche.getNichId());
        memberDAO.save(member);

        return niche;
    }

    public List<Niche> listAll() {
        return nicheDAO.findAll();
    }

    public Niche getById(Integer nichId) {
        return nicheDAO.findById(nichId)
                .orElseThrow(() -> new NotFoundException("Niche not found"));
    }

    // Chỉ owner mới được sửa — so sánh nichOwnerId với sessionUserId
    public Niche update(Integer nichId, String nichName, String nichBanner,
                        String nichAvatar, Boolean nichIsPublic, Integer sessionUserId) {
        Niche niche = getById(nichId);
        requireOwner(niche, sessionUserId);

        if (nichName != null && !nichName.isBlank()) {
            String trimmed = nichName.trim();
            if (!trimmed.equals(niche.getNichName()) && nicheDAO.findByNichName(trimmed).isPresent()) {
                throw new ConflictException("Niche name already taken");
            }
            niche.setNichName(trimmed);
        }
        if (nichBanner != null) niche.setNichBanner(nichBanner);
        if (nichAvatar != null) niche.setNichAvatar(nichAvatar);
        if (nichIsPublic != null) niche.setNichIsPublic(nichIsPublic);

        return nicheDAO.save(niche);
    }

    public void delete(Integer nichId, Integer sessionUserId) {
        Niche niche = getById(nichId);
        requireOwner(niche, sessionUserId);
        nicheDAO.delete(niche);
    }

    private void requireOwner(Niche niche, Integer sessionUserId) {
        if (!niche.getNichOwnerId().equals(sessionUserId)) {
            throw new com.interniche.common.exception.UnauthorizedException("Only niche owner can perform this action");
        }
    }
}
