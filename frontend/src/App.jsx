// import GuestNavbar from "./components/guest-navbar";
// import UserNavbar from "./components/user-navbar";
// import GuestSidebar from "./components/guest-sidebar";
// import { useEffect } from "react";
import Post from "./components/Post/Post";

function App() {
  // useEffect(() => {
  //   // This validly injects the attribute into the root html element
  //   document.documentElement.setAttribute("data-bs-theme", "dark");
  // }, []);

  // return (
  //   <>
  //     <GuestNavbar />
  //     <div className="app-body">
  //       <GuestSidebar />
  //       <main className="main-content">
  //         <div className="container">
  //           <h1>
  //             Hiện tại thì chỗ này chưa có login/register nên mình chỉ test thử các component của guest, sau khi mà có tích hợp chức năng login/register thì mình sẽ thêm chức năng thay đổi giữa trang/component của guest/user
  //           </h1>
  //         </div>
  //       </main>
  //     </div>
  //   </>
  // );

  return (
    <main className="main-content">
      <Post
        postId={1}
        createdAt="2026-08-26T15:00:00"
        content="Đây là bài post có ảnh ngang."
        image="/images/landscape.jpg"
        likeCount={25}
        dislikeCount={5}
      />

      <Post
        postId={2}
        createdAt="2026-08-26T14:00:00"
        content="Đây là bài post có ảnh vuông."
        image="/images/square.jpg"
        likeCount={10}
        dislikeCount={2}
      />

      <Post
        postId={3}
        createdAt="2026-08-26T13:00:00"
        content="Đây là bài post có ảnh dọc."
        image="/images/portrait.jpg"
        likeCount={8}
        dislikeCount={1}
      />
    </main>
  );
}

export default App;
