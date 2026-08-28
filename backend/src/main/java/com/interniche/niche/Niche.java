package com.interniche.niche;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// @Entity: map với bảng niche trong DDL
@Entity
@Table(name = "niche")
@Getter
@Setter
public class Niche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(name = "nich_id")
    private Integer nichId;

    // UNIQUE NOT NULL, tối đa 50 ký tự — kiểm tra trùng ở Service trước khi insert
    @Column(name = "nich_name", nullable = false, unique = true, length = 50)
    private String nichName;

    @Column(name = "nich_banner", length = 2048)
    private String nichBanner;

    @Column(name = "nich_avatar", length = 2048)
    private String nichAvatar;

    // FK tới user.user_id — người tạo niche, set bằng sessionUserId khi tạo
    // nullable trong DDL (ON DELETE SET NULL) nhưng lúc tạo luôn gắn owner
    @Column(name = "nich_ownerid")
    private Integer nichOwnerId;

    @Column(name = "nich_createdat", nullable = false)
    private LocalDateTime nichCreatedAt;

    @Column(name = "nich_isactive", nullable = false)
    private Boolean nichIsActive;

    // DEFAULT 1 trong DDL — public mặc định
    @Column(name = "nich_ispublic", nullable = false)
    private Boolean nichIsPublic;
}
