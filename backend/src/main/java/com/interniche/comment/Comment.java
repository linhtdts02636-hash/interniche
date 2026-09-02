package com.interniche.comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Bang comment — chua ca comment goc va reply (phan biet bang comm_parentid)
@Entity
@Table(name = "comment")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comm_id")
    private Integer commId;

    // FK toi user — tac gia comment, lay tu session
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    // FK toi content — comment thuoc post nao
    @Column(name = "cont_id", nullable = false)
    private Integer contId;

    @Column(name = "comm_body", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String commBody;

    @Column(name = "comm_createdat", nullable = false)
    private LocalDateTime commCreatedAt;

    // Chi set khi edit — luc tao de null
    @Column(name = "comm_editedat")
    private LocalDateTime commEditedAt;

    // FK toi chinh no — null la comment goc, co gia tri la reply
    // ON DELETE CASCADE trong DDL: xoa comment me thi reply cung bi xoa
    @Column(name = "comm_parentid")
    private Integer commParentId;
}
