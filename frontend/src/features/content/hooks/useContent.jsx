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

  // Nạp lại toàn bộ danh sách từ server.
  // Được gọi lại sau mỗi thao tác tạo/sửa/xoá thay vì tự cập nhật state,
  // để UI luôn phản ánh đúng dữ liệu đã được server xác nhận.
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

  // Mỗi thao tác mutation đều theo cùng một quy ước:
  // 1) đợi API thành công, 2) mới gọi reload() để đồng bộ lại từ DB.
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
