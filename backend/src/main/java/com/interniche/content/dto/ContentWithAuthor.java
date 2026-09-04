package com.interniche.content.dto;

import com.interniche.content.Content;
import com.interniche.user.User;

public record ContentWithAuthor(
       Content content, User author,
       long likeCount, long dislikeCount
        ) {
    }
