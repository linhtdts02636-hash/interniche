package com.interniche.content;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Bảng content — chứa cả post và creation, phân biệt bằng cont_type
@Entity
@Table(name = "content")
@Getter
@Setter
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cont_id")
    private Integer contId;

    // FK tới user — tác giả bài viết, lấy từ session
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    // FK tới niche — bài thuộc niche nào
    @Column(name = "nich_id", nullable = false)
    private Integer nichId;

    @Column(name = "cont_createdat", nullable = false)
    private LocalDateTime contCreatedAt;

    @Column(name = "cont_title", nullable = false, length = 100)
    private String contTitle;

    // MEDIUMTEXT — không giới hạn độ dài ở Java
    @Column(name = "cont_body", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String contBody;

    // Chỉ set khi edit — lúc tạo để null
    @Column(name = "cont_editedat")
    private LocalDateTime contEditedAt;

    // ENUM('post','creation') trong DDL — @Enumerated(STRING) lưu tên enum dạng chuỗi
    // Yêu cầu 3 của bạn: client gửi giá trị này, backend validate
    @Enumerated(EnumType.STRING)
    @Column(name = "cont_type", nullable = false)
    private ContentType contType;
}
