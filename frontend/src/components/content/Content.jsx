import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import Reactions from "../Reaction";
import Avatar from "../avatar/Avatar";

// Presentational card: chỉ render và gọi callback lên parent (onEdit/onDelete).
// Không chứa logic nghiệp vụ, không biết gì về form sửa hay API.
function Content({
  content,
  author,
  canModify,
  onEdit,
  onDelete,
  image,
  likeCount,
  dislikeCount,
}) {
  // Chỉ state giao diện của menu "..." (mở/đóng) — không phải logic nghiệp vụ.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
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
                    onEdit(content);
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
    </article>
  );
}

export default Content;
