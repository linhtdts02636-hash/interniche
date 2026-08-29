package com.interniche.content;

import com.interniche.common.exception.NotFoundException;
import com.interniche.common.exception.UnauthorizedException;
import com.interniche.niche.NicheDAO;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

// Service xử lý logic tạo/sửa/xoá post (content)
@Service
public class ContentService {

    private final ContentDAO contentDAO;
    private final NicheDAO nicheDAO;

    public ContentService(ContentDAO contentDAO, NicheDAO nicheDAO) {
        this.contentDAO = contentDAO;
        this.nicheDAO = nicheDAO;
    }

    // Tạo post/creation — Yêu cầu 3: cont_type do client gửi ('post' hoặc 'creation')
    public Content create(String contTitle, String contBody, ContentType contType,
                          Integer nichId, Integer sessionUserId) {
        if (nicheDAO.findById(nichId).isEmpty()) {
            throw new NotFoundException("Niche not found");
        }

        Content content = new Content();
        content.setUserId(sessionUserId); // tác giả = người đang đăng nhập
        content.setNichId(nichId);
        content.setContTitle(contTitle.trim());
        content.setContBody(contBody);
        content.setContType(contType); // ← YÊU CẦU 3: set enum do client chọn
        content.setContCreatedAt(LocalDateTime.now());
        content.setContEditedAt(null); // mới tạo chưa có lần sửa nào
        return contentDAO.save(content);
    }

    public List<Content> listByNiche(Integer nichId) {
        return contentDAO.findByNichId(nichId);
    }

    public List<Content> listAll() {
        return contentDAO.findAll();
    }

    public Content getById(Integer contId) {
        return contentDAO.findById(contId)
                .orElseThrow(() -> new NotFoundException("Content not found"));
    }

    // Chỉ tác giả mới được sửa
    //khi edit thì set cont_editedat = thời điểm hiện tại
    public Content update(Integer contId, String contTitle, String contBody,
                          ContentType contType, Integer sessionUserId) {
        Content content = getById(contId);
        requireAuthor(content, sessionUserId);

        if (contTitle != null && !contTitle.isBlank()) {
            content.setContTitle(contTitle.trim());
        }
        if (contBody != null) {
            content.setContBody(contBody);
        }
        if (contType != null) {
            content.setContType(contType);
        }
        content.setContEditedAt(LocalDateTime.now()); // ← đánh dấu thời gian sửa

        return contentDAO.save(content);
    }

    public void delete(Integer contId, Integer sessionUserId) {
        Content content = getById(contId);
        requireAuthor(content, sessionUserId);
        contentDAO.delete(content);
    }

    private void requireAuthor(Content content, Integer sessionUserId) {
        if (!content.getUserId().equals(sessionUserId)) {
            throw new UnauthorizedException("Only the author can edit this content");
        }
    }
}
