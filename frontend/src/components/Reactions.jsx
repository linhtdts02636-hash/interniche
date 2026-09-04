import { useState } from "react";
import { HandThumbsDown, HandThumbsUp, HandThumbsDownFill, HandThumbsUpFill } from "react-bootstrap-icons";

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
        className={`content-action btn ${isLiked ? "active" : ""}`}
        onClick={handleLike}
      >
        {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />}
        <span>{likes}</span>
      </button>

      <button
        className={`content-action btn ${isDisliked ? "active" : ""}`}
        onClick={handleDislike}
      >
        {isDisliked ? <HandThumbsDownFill /> : <HandThumbsDown />}
        <span>{dislikes}</span>
      </button>
    </div>
  );
}

export default Reactions;
