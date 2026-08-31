import { NavLink } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import Reactions from "../Reactions";

function Content({ contentId, createdAt, title, body, image, likeCount, dislikeCount }) {
  return (
    <article className="post rounded-gradient-border ">
      <TimeAgo createdAt={createdAt} />
      <h3>{title}</h3>
      <p className="post-content">{body}</p>

      {image && <img src={image} alt="Content" className="post-image" />}

      <Reactions likeCount={likeCount} dislikeCount={dislikeCount} />

      <div className="post-actions">
        <NavLink to={`/contents/${contentId}/comments`} className="post-action">
          comment
        </NavLink>
      </div>
    </article>
  );
}

export default Content;
