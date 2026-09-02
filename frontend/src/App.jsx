import { useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import AuthProvider from "./context/AuthContext";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );

}

export default App;

// import { useEffect, useState } from "react";
// import AppRoutes from "./router/AppRoutes";
// import AuthProvider from "./context/AuthContext";
// import PostCreate from "./components/Post/PostCreate";

// function App() {
//   // State điều khiển Modal PostCreate
//   const [isPostCreateOpen, setIsPostCreateOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-bs-theme", "dark");
//   }, []);

//   return (
//     <>
//       <button
//         type="button"
//         className="btn btn-primary"
//         onClick={() => setIsPostCreateOpen(true)}
//       >
//         +
//       </button>
//       <PostCreate
//         isOpen={isPostCreateOpen}
//         onClose={() => setIsPostCreateOpen(false)}
//       />
//     </>
//   );
// }

// export default App;
