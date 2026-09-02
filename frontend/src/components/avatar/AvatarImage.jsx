import { PersonCircle } from "react-bootstrap-icons";

function AvatarImage({ src, isUser }) {

  return (
    <div
      className={`avatar-container border border-2 ${
        isUser ? "rounded-circle" : "rounded-1"
      }`}
    >
      {src ? (
        <img
          src={src}
          className="w-100 h-100 object-fit-cover"
        />
      ) : (
        <PersonCircle size={60} />
      )}
    </div>
  );
}

export default AvatarImage;