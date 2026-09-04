import { useState } from "react";

function Reactions({ likeCount = 0, dislikeCount = 0 }) {
  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(dislikeCount);
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

  return (
    <div className="content-actions">
      <button
        className={`content-action ${isLiked ? "active" : ""}`}
        onClick={handleLike}
      >
        👍
        <span>{likes}</span>
      </button>

      <button
        className={`content-action ${isDisliked ? "active" : ""}`}
        onClick={handleDislike}
      >
        👎
        <span>{dislikes}</span>
      </button>
    </div>
  );
}

export default Reactions;
