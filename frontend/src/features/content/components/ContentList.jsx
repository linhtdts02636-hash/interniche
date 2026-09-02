import useContent from "../hooks/useContent";
import { useAuth } from "../../../context/AuthContext";
import Content from "../../../components/content/Content";
import ContentCreate from "../../../components/content/ContentCreate";
import { useState } from "react";

function ContentList({ nichId }) {
  const { contents, create, edit, remove } = useContent();
  const { user } = useAuth();
  const [isContentCreateOpen, setIsContentCreateOpen] = useState(false);

  const canModifyContent = (author) =>
    !!user && (user.userId === author.userId || !!user.userIsAdmin);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setIsContentCreateOpen(true)}>
          +
        </button>

        <ContentCreate
          isOpen={isContentCreateOpen}
          onClose={() => setIsContentCreateOpen(false)}
          nichId={nichId}
          create={create}
        />
      </div>
      {contents.map(({ content, author }) => (
        <Content
          key={content.contId}
          content={content}
          author={author}
          canModify={canModifyContent(author)}
          onDelete={remove}
          edit={edit}
        />
      ))}
    </div>
  );
}

export default ContentList;
