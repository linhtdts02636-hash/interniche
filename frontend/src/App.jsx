import GuestNavbar from "./components/guest-navbar";
import UserNavbar from "./components/user-navbar";
import GuestSidebar from "./components/guest-sidebar";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // This validly injects the attribute into the root html element
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <>
      <GuestNavbar />
      <div className="app-body">
        <GuestSidebar />
        <main className="main-content">
          <div className="container">
            <h1>
              Hiện tại thì chỗ này chưa có login/register nên mình chỉ test thử các component của guest, sau khi mà có tích hợp chức năng login/register thì mình sẽ thêm chức năng thay đổi giữa trang/component của guest/user
            </h1>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
