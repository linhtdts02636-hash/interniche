package com.interniche.comment;

import com.interniche.common.exception.NotFoundException;
import com.interniche.common.exception.UnauthorizedException;
import com.interniche.content.ContentDAO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

// Service xu ly CRUD comment — chi author duoc sua/xoa
@Service
public class CommentService {

    private final CommentDAO commentDAO;
    private final ContentDAO contentDAO;

    public CommentService(CommentDAO commentDAO, ContentDAO contentDAO) {
        this.commentDAO = commentDAO;
        this.contentDAO = contentDAO;
    }

    // Tao comment hoac reply — parentId null la comment goc, co gia tri la reply
    public Comment create(Integer contId, String commBody, Integer parentId, Integer sessionUserId) {
        if (contentDAO.findById(contId).isEmpty()) {
            throw new NotFoundException("Content not found");
        }
        // Neu la reply: kiem tra comment me ton tai va thuoc cung post
        if (parentId != null) {
            Comment parent = commentDAO.findById(parentId)
                    .orElseThrow(() -> new NotFoundException("Parent comment not found"));
            if (!parent.getContId().equals(contId)) {
                throw new IllegalArgumentException("Parent comment does not belong to this content");
            }
        }

        Comment comment = new Comment();
        comment.setUserId(sessionUserId);
        comment.setContId(contId);
        comment.setCommBody(commBody.trim());
        comment.setCommCreatedAt(LocalDateTime.now());
        comment.setCommEditedAt(null); // moi tao chua sua
        comment.setCommParentId(parentId);
        return commentDAO.save(comment);
    }

    // List flat theo contId, order by createdAt — frontend build cay qua parentId
    public List<Comment> listByContent(Integer contId) {
        if (contentDAO.findById(contId).isEmpty()) {
            throw new NotFoundException("Content not found");
        }
        return commentDAO.findByContId(contId);
    }

    public Comment getById(Integer commId) {
        return commentDAO.findById(commId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));
    }

    // Chi author duoc sua — set editedAt = now
    public Comment update(Integer commId, String commBody, Integer sessionUserId) {
        Comment comment = getById(commId);
        requireAuthor(comment, sessionUserId);
        comment.setCommBody(commBody.trim());
        comment.setCommEditedAt(LocalDateTime.now()); // yeu cau: edit thi co editedat
        return commentDAO.save(comment);
    }

    // Chi author duoc xoa — reply cascade do FK ON DELETE CASCADE
    public void delete(Integer commId, Integer sessionUserId) {
        Comment comment = getById(commId);
        requireAuthor(comment, sessionUserId);
        commentDAO.delete(comment);
    }

    private void requireAuthor(Comment comment, Integer sessionUserId) {
        if (!comment.getUserId().equals(sessionUserId)) {
            throw new UnauthorizedException("Only the author can modify this comment");
        }
    }
}
