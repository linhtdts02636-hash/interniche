package com.interniche.reaction;

import com.interniche.comment.CommentDAO;
import com.interniche.common.exception.NotFoundException;
import com.interniche.content.ContentDAO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Service xu ly reaction — upsert (tao moi hoac doi type neu da ton tai)
@Service
public class ReactionService {

    private final ReactionDAO reactionDAO;
    private final ContentDAO contentDAO;
    private final CommentDAO commentDAO;

    public ReactionService(ReactionDAO reactionDAO, ContentDAO contentDAO, CommentDAO commentDAO) {
        this.reactionDAO = reactionDAO;
        this.contentDAO = contentDAO;
        this.commentDAO = commentDAO;
    }

    // React post — upsert: da like roi bam like lai -> idempotent, doi sang dislike -> update
    public Reaction reactToContent(Integer contId, ReactionType type, Integer userId) {
        if (contentDAO.findById(contId).isEmpty()) {
            throw new NotFoundException("Content not found");
        }
        Optional<Reaction> existing = reactionDAO.findByUserIdAndContId(userId, contId);
        if (existing.isPresent()) {
            Reaction r = existing.get();
            if (r.getReacType() == type) {
                return r; // cung type -> idempotent, tra ve luon
            }
            r.setReacType(type); // doi type
            return reactionDAO.save(r);
        }
        Reaction reaction = new Reaction();
        reaction.setUserId(userId);
        reaction.setContId(contId);
        reaction.setCommId(null);
        reaction.setReacType(type);
        reaction.setReacReactedAt(LocalDateTime.now());
        return reactionDAO.save(reaction);
    }

    // React comment — tuong tu
    public Reaction reactToComment(Integer commId, ReactionType type, Integer userId) {
        if (commentDAO.findById(commId).isEmpty()) {
            throw new NotFoundException("Comment not found");
        }
        Optional<Reaction> existing = reactionDAO.findByUserIdAndCommId(userId, commId);
        if (existing.isPresent()) {
            Reaction r = existing.get();
            if (r.getReacType() == type) {
                return r;
            }
            r.setReacType(type);
            return reactionDAO.save(r);
        }
        Reaction reaction = new Reaction();
        reaction.setUserId(userId);
        reaction.setCommId(commId);
        reaction.setContId(null);
        reaction.setReacType(type);
        reaction.setReacReactedAt(LocalDateTime.now());
        return reactionDAO.save(reaction);
    }

    // Xoa reaction cua minh tren post
    public void unreactFromContent(Integer contId, Integer userId) {
        Reaction reaction = reactionDAO.findByUserIdAndContId(userId, contId)
                .orElseThrow(() -> new NotFoundException("Reaction not found"));
        reactionDAO.delete(reaction);
    }

    // Xoa reaction cua minh tren comment
    public void unreactFromComment(Integer commId, Integer userId) {
        Reaction reaction = reactionDAO.findByUserIdAndCommId(userId, commId)
                .orElseThrow(() -> new NotFoundException("Reaction not found"));
        reactionDAO.delete(reaction);
    }

    public List<Reaction> listByContent(Integer contId) {
        return reactionDAO.findByContId(contId);
    }

    public List<Reaction> listByComment(Integer commId) {
        return reactionDAO.findByCommId(commId);
    }
}
