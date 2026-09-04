import { useEffect, useState } from "react";
import { getContent, createContent, editContentById, deleteContentById } from "../api";

function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // `cancelled` tránh setState sau khi component đã unmount (tránh lỗi React "setState on unmounted component")
    let cancelled = false;
    getContent()
      .then((data) => {
        if (!cancelled) setContents(data);
      })
      .catch(() => {
        if (!cancelled) setContents([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

    // Reload để UI luôn khớp với dữ liệu server sau mỗi mutation
  const reload = async () => {
    setLoading(true);
    try {
      const data = await getContent();
      setContents(data);
    } catch {
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  // Mỗi mutation: đợi API thành công rồi reload() đồng bộ lại từ DB
  const create = async (contTitle, contBody, contType, nichId) => {
    await createContent(contTitle, contBody, contType, nichId);
    await reload();
  };

  const edit = async (id, contTitle, contBody, contType) => {
    await editContentById(id, contTitle, contBody, contType);
    await reload();
  };

  const remove = async (id) => {
    await deleteContentById(id);
    await reload();
  };

  return { contents, loading, create, edit, remove };
}

export default useContent;
