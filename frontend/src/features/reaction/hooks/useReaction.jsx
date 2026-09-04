import { useState } from "react";
import { getReactionByContentId } from "../api";
import { useEffect } from "react";

function useReaction(contId) {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getReactionByContentId(contId)
      .then((data) => {
        if (!cancelled) setReactions(data);
      })
      .catch(() => {
        if (!cancelled) setReactions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [contId]);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await getReactionByContentId(contId);
      setReactions(data);
    } catch {
      setReactions([]);
    } finally {
      setLoading(false);
    }
  };
    return { reactions, loading };

}

export default useReaction;
