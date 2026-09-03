package com.interniche.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Query comment theo post hoac theo parent (lay reply)
public interface CommentDAO extends JpaRepository<Comment, Integer> {

    List<Comment> findByContId(Integer contId);

    List<Comment> findByCommParentId(Integer parentId);
}
