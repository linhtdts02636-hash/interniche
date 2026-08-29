package com.interniche.content;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Query theo niche hoặc author — phục vụ list post trong niche
public interface ContentDAO extends JpaRepository<Content, Integer> {

    List<Content> findByNichId(Integer nichId);

    List<Content> findByUserId(Integer userId);
}
