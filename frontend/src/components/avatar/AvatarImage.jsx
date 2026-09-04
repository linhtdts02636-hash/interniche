import { Question } from "react-bootstrap-icons";

function AvatarImage({ src, isUser }) {

  return (
    <div
      className={`avatar-container border border-1 ${
        isUser ? "rounded-circle" : "rounded-1"
      }`}
    >
      {src ? (
        <img
          src={src}
          className="w-100 h-100 object-fit-cover"
        />
      ) : (
        <Question size={60} />
      )}
    </div>
  );
}

export default AvatarImage;