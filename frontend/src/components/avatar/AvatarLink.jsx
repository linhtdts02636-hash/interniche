import { NavLink } from "react-router-dom";
import { PatchCheckFill } from "react-bootstrap-icons";

function AvatarLink({ id, isUser, name, isAdmin }) {
  return (
  <NavLink 
  to={{isUser} ? `/profile/${id}` : `/niche/${id}`}>{name}
  {isAdmin ? <PatchCheckFill className="checkmark ms-1"/>: ""}
  </NavLink>
);
}

export default AvatarLink
