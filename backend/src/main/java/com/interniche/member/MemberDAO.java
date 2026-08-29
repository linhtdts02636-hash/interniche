package com.interniche.member;

import org.springframework.data.jpa.repository.JpaRepository;

// DAO cho bảng member — khoá kép MemberId
public interface MemberDAO extends JpaRepository<Member, MemberId> {

    boolean existsByUserIdAndNichId(Integer userId, Integer nichId);
}
