import AvatarImage from "./AvatarImage";
import AvatarLink from "./AvatarLink";

function Avatar({id, isUser, name, src, isAdmin}) {
  return (
    <div className="d-flex align-items-center gap-1">
      <AvatarImage src={src} isUser={isUser}></AvatarImage>

      <AvatarLink id={id} isUser={isUser} name={name} isAdmin={isAdmin}></AvatarLink>
    </div>
  );
}

export default Avatar;