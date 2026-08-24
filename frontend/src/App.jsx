import GuestNavbar from "./components/guest-navbar";
import UserNavbar from "./components/user-navbar";
import UserSidebar from "./components/user-sidebar";
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    // This validly injects the attribute into the root html element 
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <>
      <UserNavbar />
    <div className="app-body">
      <UserSidebar />
      <main className="main-content">
        <h1>hellohellohellohellohellohellohellothewordstartshereanditshouldbeoverwrappeddowntothebottom,ifitsnottherestrouble
        </h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />
        <h1>hellohellohellohellohellohellohellohello</h1><br />

      </main>
    </div>

    </>
  );
}

export default App;
