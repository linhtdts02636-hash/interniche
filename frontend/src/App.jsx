import GuestNavbar from "./components/guest-navbar";
import UserNavbar from "./components/user-navbar";
import GuestSidebar from "./components/guest-sidebar";
import { useEffect } from "react";
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
        createdAt="2026-08-26T21:00:00"
        content="Đây là bài post mẫu để tôi kiểm tra component Post. Nội dung này được sử dụng để kiểm tra text-align justify và khoảng cách của component."
        likeCount={0}
        dislikeCount={0}
      />
    </main>
  );
}

export default App;
