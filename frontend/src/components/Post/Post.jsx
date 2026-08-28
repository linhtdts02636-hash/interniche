import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Post({ postId,createdAt, content, image, likeCount, dislikeCount }) {
  // Thời gian đăng bài
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  // State cho like và dislike
  // Trường hợp nhấn like hoặc dislike
  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(dislikeCount);

  // Trường hợp bỏ like hoặc dislike
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      setIsLiked(false);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
      setIsLiked(true);

      if (isDisliked) {
        setDislikes((prevDislikes) => prevDislikes - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes((prevDislikes) => prevDislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes((prevDislikes) => prevDislikes + 1);
      setIsDisliked(true);

      if (isLiked) {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false);
      }
    }
  };

  // Phần dữ liệu đc trả về hiển thị trên mỗi component
  return (
    <article className="post">
      <span className="post-time">{timeAgo}</span>
      <p className="post-content">{content}</p>

      {image && <img src={image} alt="Post" className="post-image" />}
      <div className="post-actions">
        <button
          className={`post-action ${isLiked ? "active" : ""}`}
          onClick={handleLike}
        >
          👍
          <span>{likes}</span>
        </button>

        <button
          className={`post-action ${isDisliked ? "active" : ""}`}
          onClick={handleDislike}
        >
          👎
          <span>{dislikes}</span>
        </button>

        <NavLink to={`/posts/${postId}/comments`} className="post-action">
          comment
        </NavLink>
      </div>
    </article>
  );
}

export default Post;

// Function tính thời gian đăng bài post
function getTimeAgo(createdAt) {
  const now = new Date();
  const postTime = new Date(createdAt);

  const difference = now - postTime;

  const seconds = Math.floor(difference / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 7) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 30);

  return `${months} months ago`;
}
