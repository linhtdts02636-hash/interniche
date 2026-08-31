import useContent from "../hooks/useContent";
import Content from "../../../components/content/Content";

function ContentList() {
    const {posts} = useContent();
    return (
        <div>
            {posts.map((post) => (
                <Content
                key={post.contId}
                contentId={post.contId}
                createdAt={post.contCreatedAt}
                title={post.contTitle}
                body={post.contBody}
                >
                </Content>
            ))}
        </div>
    )
}

export default ContentList
