import { useState } from "react";
import useContent from "../hooks/useContent";
import { useAuth } from "../../../context/AuthContext";
import ContentCreate from "../../../components/content/ContentCreate";
import ContentRow from "./ContentRow";

function ContentList({ nichId }) {
  const { contents, create, edit, remove } = useContent();
  const { user } = useAuth();

  // mode: "create" | "edit" | null (đóng)
  const [mode, setMode] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");

  const canModifyContent = (author) =>
    !!user && (user.userId === author.userId || !!user.userIsAdmin);
  const openCreate = () => {
    setEditing(null);
    setFormTitle("");
    setFormBody("");
    setMode("create");
  };

  const openEdit = (content) => {
    setEditing(content);
    setFormTitle(content.contTitle);
    setFormBody(content.contBody);
    setMode("edit");
  };

  const closeForm = () => {
    setMode(null);
    setEditing(null);
  };

  // Nút submit: parent quyết định create hay edit, và ép loại "post"
  const handleSubmit = async () => {
    if (mode === "edit" && editing) {
      await edit(editing.contId, editing.contTitle, formBody.trim(), "post");
    } else {
      await create(formTitle.trim(), formBody.trim(), "post", nichId);
    }
    closeForm();
  };

  return (
    <div>
      <div>
        <button type="button" className="btn" onClick={openCreate}>
          +
        </button>

        <ContentCreate
          isOpen={mode !== null}
          onClose={closeForm}
          title={formTitle}
          body={formBody}
          onTitleChange={setFormTitle}
          onBodyChange={setFormBody}
          submitLabel={mode === "edit" ? "Save" : "Post"}
          canSubmit={formBody.trim().length > 0}
          onSubmit={handleSubmit}
        />
      </div>
      {contents.map(({ content, author, likeCount, dislikeCount }) => (
        <ContentRow
          key={content.contId}
          content={content}
          author={author}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          canModify={canModifyContent(author)}
          onEdit={openEdit}
          onDelete={remove}
        />
      ))}
    </div>
  );
}

export default ContentList;
