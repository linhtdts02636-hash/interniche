package com.interniche.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Không cần viết SQL! Spring Data JPA ĐỌC TÊN PHƯƠNG THỨC và tự sinh query:
//   findByFirebaseUid("abc") -> SELECT * FROM user WHERE user_firebaseuid = 'abc'
//   findByUserName("jack")   -> SELECT * FROM user WHERE user_name = 'jack'
// Quy tắc: findBy + tên field (viết hoa chữ đầu). Sai tên field -> lỗi lúc khởi động, không phải lúc chạy.
// Optional<T>: tránh trả null — buộc caller xử lý trường hợp không tìm thấy (orElseThrow / isPresent).
// JpaRepository đã có sẵn: save, findById, findAll, deleteById... không cần viết lại.
public interface UserDAO extends JpaRepository<User, Integer> {

    Optional<User> findByFirebaseUid(String firebaseUid);

    Optional<User> findByUserName(String userName);
}
