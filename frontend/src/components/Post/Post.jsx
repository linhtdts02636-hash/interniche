import { useEffect, useState } from "react";

function Post({ createdAt, content, image }) {
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
    setLikes(likes + 1);
  }; // Làm nút like hoạt động

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  // Phần dữ liệu đc trả về hiển thị trên mỗi component
  return (
    <article className="post">
      <span className="post-time">{timeAgo}</span>

      <p className="post-content">{content}</p>

      {image && <img src={image} alt="Post" className="post-image" />}

      <button className="post-action" onClick={handleLike}>
        👍
        <span>{likes}</span>
      </button>

      <button className="post-action" onClick={handleDislike}>
        👎
        <span>{dislikes}</span>
      </button>
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
