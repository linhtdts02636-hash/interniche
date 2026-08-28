package com.interniche.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// @Entity: class này map với 1 bảng trong DB (JPA)
// @Table(name = "user"): tên bảng là "user" — khớp file SQL script (nguồn chân lý của schema)
@Entity
@Table(name = "user")
@Getter // Lombok tự sinh getter cho mọi field
@Setter // Lombok tự sinh setter cho mọi field
public class User {

    // @Id: khoá chính | IDENTITY: DB tự tăng (AUTO_INCREMENT), Hibernate đọc giá trị sau khi INSERT
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    // @Column(name=...): nối field camelCase <-> cột snake_case trong DB.
    // nullable/unique/length phải KHỚP DDL vì ddl-auto=validate sẽ đối chiếu lúc khởi động, lệch là fail!
    @Column(name = "user_name", nullable = false, unique = true, length = 50)
    private String userName;

    // user_avatar NOT NULL không default -> khi register phải set "" (quyết định của team)
    @Column(name = "user_avatar", nullable = false, length = 2048)
    private String userAvatar = "";

    @Column(name = "user_banner", length = 2048)
    private String userBanner;

    @Column(name = "user_bio", length = 250)
    private String userBio;

    @Column(name = "user_email", length = 100)
    private String userEmail;

    // DATETIME <-> LocalDateTime; cột có DEFAULT CURRENT_TIMESTAMP nhưng Hibernate insert đủ cột nên vẫn set tay
    @Column(name = "user_joinedat", nullable = false)
    private LocalDateTime userJoinedAt;

    // BIT <-> Boolean
    @Column(name = "user_isactive", nullable = false)
    private Boolean userIsActive;

    @Column(name = "user_firebaseuid", nullable = false, length = 300)
    private String firebaseUid;

    @Column(name = "user_isadmin", nullable = false)
    private Boolean userIsAdmin;
}
