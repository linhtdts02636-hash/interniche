import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import Reactions from "../Reactions";
import Avatar from "../avatar/Avatar";
import ContentCreate from "./ContentCreate";

function Content({
  content,
  author,
  canModify,
  onDelete,
  edit,
  image,
  likeCount,
  dislikeCount,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className="content rounded-gradient-border">
      <div className="content-header">
        <Avatar
          id={author.userId}
          isUser={true}
          name={author.userName}
          src={author.userAvatar}
          isAdmin={author.userIsAdmin}
        />
        <TimeAgo createdAt={content.contCreatedAt} />

        {canModify && (
          <div className="content-menu" ref={menuRef}>
            <button
              type="button"
              className="content-menu-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="More actions"
            >
              ...
            </button>

            {menuOpen && (
              <div className="content-menu-dropdown">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setEditOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(content.contId);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="content-content" >{content.contTitle}</p>
        <p className="content-content">{content.contBody}</p>
      </div>

      {image && <img src={image} alt="Content" className="content-image" />}

      <Reactions likeCount={likeCount} dislikeCount={dislikeCount} />

      <div className="content-actions">
        <NavLink to={`/contents/${content.contId}/comments`} className="content-action">
          comment
        </NavLink>
      </div>

      <ContentCreate
        key={editOpen ? content.contId : "closed"}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        editContent={content}
        edit={edit}
      />
    </article>
  );
}

export default Content;
