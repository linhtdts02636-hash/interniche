package com.interniche.member;

import java.io.Serializable;
import java.util.Objects;

// Khoá chính kép cho bảng member (user_id, nich_id) — cần class riêng để JPA hiểu
// Phải implement Serializable và override equals/hashCode
public class MemberId implements Serializable {

    private Integer userId;
    private Integer nichId;

    public MemberId() {}

    public MemberId(Integer userId, Integer nichId) {
        this.userId = userId;
        this.nichId = nichId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberId that = (MemberId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(nichId, that.nichId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, nichId);
    }
}
