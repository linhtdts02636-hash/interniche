package com.interniche.content;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.interniche.common.exception.NotFoundException;
import com.interniche.common.exception.UnauthorizedException;
import com.interniche.content.dto.ContentWithAuthor;
import com.interniche.niche.NicheDAO;
import com.interniche.reaction.Reaction;
import com.interniche.reaction.ReactionDAO;
import com.interniche.reaction.ReactionType;
import com.interniche.user.User;
import com.interniche.user.UserDAO;

@Service
public class ContentService {

    private final ContentDAO contentDAO;
    private final NicheDAO nicheDAO;
    private final UserDAO userDAO;
    private final ReactionDAO reactionDAO;

    public ContentService(ContentDAO contentDAO, NicheDAO nicheDAO, UserDAO userDAO,
                          ReactionDAO reactionDAO) {
        this.contentDAO = contentDAO;
        this.nicheDAO = nicheDAO;
        this.userDAO = userDAO;
        this.reactionDAO = reactionDAO;
    }

    public Content create(String contTitle, String contBody, ContentType contType,
                          Integer nichId, Integer sessionUserId) {
        if (nicheDAO.findById(nichId).isEmpty()) {
            throw new NotFoundException("Niche not found");
        }

        Content content = new Content();
        content.setUserId(sessionUserId);
        content.setNichId(nichId);
        content.setContTitle(contTitle.trim());
        content.setContBody(contBody);
        content.setContType(contType);
        content.setContCreatedAt(LocalDateTime.now());
        content.setContEditedAt(null);
        return contentDAO.save(content);
    }

    public List<ContentWithAuthor> listByNiche(Integer nichId) {
        List<Content> contents = contentDAO.findByNichId(nichId);
        Map<Integer, User> users = loadUsers(contents);
        Map<Integer, long[]> counts = reactionCounts(contents);
        return contents.stream()
            .map(c -> new ContentWithAuthor(c, users.get(c.getUserId()),
                    countFor(counts, c.getContId())[0], countFor(counts, c.getContId())[1]))
            .toList();
    }


    public List<ContentWithAuthor> listAll() {
        List<Content> contents = contentDAO.findAll();
        Map<Integer, User> users = loadUsers(contents);
        Map<Integer, long[]> counts = reactionCounts(contents);
        return contents.stream()
            .map(c -> new ContentWithAuthor(c, users.get(c.getUserId()),
                    countFor(counts, c.getContId())[0], countFor(counts, c.getContId())[1]))
            .toList();
    }

    // Content không có reaction sẽ không có key trong map nên phải getOrDefault
    private long[] countFor(Map<Integer, long[]> counts, Integer contId) {
        return counts.getOrDefault(contId, new long[]{0L, 0L});
    }

    private Map<Integer, User> loadUsers(List<Content> contents) {
        List<Integer> ids = contents.stream().map(Content::getUserId).distinct().toList();
        return userDAO.findAllById(ids).stream()
            .collect(Collectors.toMap(User::getUserId, u -> u));
    }

    // Map<contId, long[]{likes, dislikes}> từ một query gộp để tránh N+1
    private Map<Integer, long[]> reactionCounts(List<Content> contents) {
        return reactionDAO.findByContIdIn(
                    contents.stream().map(Content::getContId).toList())
            .stream()
            .collect(Collectors.groupingBy(
                Reaction::getContId,
                Collectors.collectingAndThen(Collectors.toList(), list -> {
                    long likes = list.stream()
                        .filter(r -> r.getReacType() == ReactionType.like).count();
                    long dislikes = list.stream()
                        .filter(r -> r.getReacType() == ReactionType.dislike).count();
                    return new long[]{likes, dislikes};
                })));
    }

    public Content getById(Integer contId) {
        return contentDAO.findById(contId)
                .orElseThrow(() -> new NotFoundException("Content not found"));
    }

    // Chỉ tác giả mới được sửa; khi edit set cont_editedat = hiện tại
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
        content.setContEditedAt(LocalDateTime.now());

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
