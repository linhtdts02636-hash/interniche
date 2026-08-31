// import { PersonCircle } from "react-bootstrap-icons";

// function Avatar({ src, type }) {
//   return src ? (
//     <img
//       src={src}
//       alt="Avatar"
//       width="80"
//       height="80"
//       className={`object-fit-cover ${type === "user" ? "rounded-circle" : ""}`}
//     />
//   ) : (
//     <PersonCircle
//       size={80}
//       className={type === "user" ? "rounded-circle" : ""}
//     />
//   );
// }

// export default Avatar;

import { PersonCircle } from "react-bootstrap-icons";

function Avatar({ src, type }) {
  const isUser = type === "user";

  return (
    <div
      className={`avatar-container border border-3 ${
        isUser ? "rounded-circle" : "rounded-2"
      }`}
    >
      {src ? (
        <img
          src={src}
          alt="Avatar"
          className="w-100 h-100 object-fit-cover"
        />
      ) : (
        <PersonCircle size={60} />
      )}
    </div>
  );
}

export default Avatar;