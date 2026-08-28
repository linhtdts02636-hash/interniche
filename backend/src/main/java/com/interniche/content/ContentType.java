package com.interniche.content;

// Enum cho cột cont_type trong DB — KHỚP giá trị ENUM('post','creation') trong DDL
// @Enumerated(STRING) sẽ lưu tên enum dưới dạng chuỗi trong DB
public enum ContentType {
    post,
    creation
}
