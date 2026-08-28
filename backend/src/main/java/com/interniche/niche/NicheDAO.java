package com.interniche.niche;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Spring tự sinh query từ tên phương thức: findByNichName -> WHERE nich_name = ?
public interface NicheDAO extends JpaRepository<Niche, Integer> {

    Optional<Niche> findByNichName(String nichName);
}
