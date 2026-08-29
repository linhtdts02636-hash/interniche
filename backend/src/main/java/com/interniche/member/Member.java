package com.interniche.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Bảng trung gian many-to-many: user tham gia niche nào
@Entity
@Table(name = "member")
@IdClass(MemberId.class) // báo JPA dùng MemberId làm khoá kép
@Getter
@Setter
public class Member {

    // 2 cột này VỪA là FK VỪA là PK (composite key)
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "nich_id")
    private Integer nichId;

    // Thời gian join — DB có DEFAULT CURRENT_TIMESTAMP nhưng vẫn set tay cho validate ổn
    @Column(name = "memb_joinedat", nullable = false)
    private LocalDateTime membJoinedAt;

    public Member() {}

    public Member(Integer userId, Integer nichId) {
        this.userId = userId;
        this.nichId = nichId;
        this.membJoinedAt = LocalDateTime.now();
    }
}
