package com.interniche.reaction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Bang reaction — 1 user chi co 1 reaction cho 1 target (post hoac comment)
// DDL CHECK: (cont_id XOR comm_id) — 1 trong 2 phai non-null, Service se validate
@Entity
@Table(name = "reaction", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "cont_id"}),
        @UniqueConstraint(columnNames = {"user_id", "comm_id"})
})
@Getter
@Setter
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reac_id")
    private Integer reacId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    // FK toi content — nullable, chi set khi react post
    @Column(name = "cont_id")
    private Integer contId;

    // FK toi comment — nullable, chi set khi react comment
    @Column(name = "comm_id")
    private Integer commId;

    // ENUM('like','dislike') trong DDL
    @Enumerated(EnumType.STRING)
    @Column(name = "reac_type", nullable = false)
    private ReactionType reacType;

    @Column(name = "reac_reactedat", nullable = false)
    private LocalDateTime reacReactedAt;
}
