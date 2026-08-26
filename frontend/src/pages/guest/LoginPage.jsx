import LoginForm from "../../features/auth/components/LoginForm";
import GuestNavbar from "../../components/GuestNavbar";
import GuestSidebar from "../../components/GuestSidebar";

function LoginPage() {
  return (
    <>
      <GuestNavbar />
      <div className="app-body">
        <GuestSidebar />
        <div className="container">
          <main className="main-content">
            <LoginForm></LoginForm>
          </main>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
