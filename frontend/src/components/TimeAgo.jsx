import { useEffect, useState } from "react";
import { getTimeAgo } from "../utils/time";

function TimeAgo({ createdAt }) {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span className="post-time">{timeAgo}</span>;
}

export default TimeAgo;
