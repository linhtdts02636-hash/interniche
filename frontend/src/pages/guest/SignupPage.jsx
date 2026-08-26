import SignupForm from "../../features/auth/components/SignupForm";
import GuestNavbar from "../../components/GuestNavbar";
import GuestSidebar from "../../components/GuestSidebar";

function SignupPage() {
  return (
    <>
      <GuestNavbar />
      <div className="app-body">
        <GuestSidebar />
        <div className="container">
          <main className="main-content">
            <SignupForm></SignupForm>
          </main>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
