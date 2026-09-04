import { NavLink } from "react-router-dom";
import { PatchCheckFill } from "react-bootstrap-icons";

function AvatarLink({ id, isUser, name, isAdmin }) {
  return (
  <NavLink 
  to={{isUser} ? `/profile/${id}` : `/niche/${id}`}>
    <div className="d-flex align-items-center">
    {name}
  {isAdmin ? <PatchCheckFill className="checkmark ms-1"/>: ""}
    </div>

  </NavLink>
);
}

export default AvatarLink
