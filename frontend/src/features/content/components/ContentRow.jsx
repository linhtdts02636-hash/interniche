import Content from "../../../components/content/Content";

function ContentRow({ content, author, canModify, onEdit, onDelete, image, likeCount, dislikeCount }) {
    return (
        <Content
          content={content}
          author={author}
          canModify={canModify}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          onEdit={onEdit}
          onDelete={onDelete}
          image={image}
        />
    );
}
export default ContentRow;