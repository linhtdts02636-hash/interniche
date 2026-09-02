import { useEffect, useState } from "react";
import { getContent } from "../api";

function useContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getContent()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {cancelled = true}
  }, []);

  return {posts, loading};
}

export default useContent;
