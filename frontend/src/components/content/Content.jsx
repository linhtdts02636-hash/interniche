import { NavLink } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import Reactions from "../Reactions";
import Avatar from "../avatar/Avatar";

function Content({
  contentId,
  createdAt,
  title,
  body,
  image, //not implemented yet
  likeCount, //not implemented yet
  dislikeCount, //not implemented yet
}) {
  return (
    <NavLink to={`/post/${contentId}`}>
<article className="post rounded-gradient-border ">
      <div className="content-header">
        <Avatar id={2} isUser={false} name="username" isAdmin={true} />
        <TimeAgo createdAt={createdAt} />
      </div>

      <div className="post-content mt-3">
        <p>{title}</p>
        <p >{body}</p>
      </div>

      {image && <img src={image} alt="Content" className="post-image" />}

      <Reactions likeCount={likeCount} dislikeCount={dislikeCount} />

      <div className="post-actions">
        <NavLink to={`/contents/${contentId}/comments`} className="post-action">
          comment
        </NavLink>
      </div>
    </article>
    </NavLink>
    
  );
}

export default Content;
