package com.interniche.reaction;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Query reaction theo user+target de upsert, va theo target de list/count
public interface ReactionDAO extends JpaRepository<Reaction, Integer> {

    Optional<Reaction> findByUserIdAndContId(Integer userId, Integer contId);

    Optional<Reaction> findByUserIdAndCommId(Integer userId, Integer commId);

    List<Reaction> findByContId(Integer contId);

    List<Reaction> findByCommId(Integer commId);
}
