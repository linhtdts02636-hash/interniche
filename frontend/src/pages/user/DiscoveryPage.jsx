import { useState } from "react";
import Avatar from "../components/avatar/Avatar";
import PostCreate from "../components/Post/PostCreate";

import portrait from "./portrait.jpg";

function DiscoveryPage() {
  const [isPostCreateOpen, setIsPostCreateOpen] = useState(false);

  return (
    <div>
      <Avatar type="user" src={portrait} />

      {/* Nút + */}
      <button type="button" onClick={() => setIsPostCreateOpen(true)}>
        +
      </button>

      {/* Post Create Modal */}
      <PostCreate
        isOpen={isPostCreateOpen}
        onClose={() => setIsPostCreateOpen(false)}
      />
    </div>
  );
}

export default DiscoveryPage;
