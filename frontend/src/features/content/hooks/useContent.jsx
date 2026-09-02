import { useEffect, useState } from "react";
import { getContent, createContent, editContentById, deleteContentById } from "../api";

// Hook quản lý state và gọi API cho danh sách content (post/creation).
// Cung cấp danh sách `contents` cùng các thao tác create/edit/remove cho UI.
function useContent() {
  // contents: mảng các phần tử { content, author } trả về từ server
  const [contents, setContents] = useState([]);
  // loading: đánh dấu đang tải dữ liệu từ server
  const [loading, setLoading] = useState(true);

  // Tải toàn bộ content lần đầu khi hook được mount.
  // Dùng cờ `cancelled` để tránh setState sau khi component đã unmount (tránh memory leak).
  useEffect(() => {
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

  // Nạp lại dữ liệu từ server và cập nhật state.
  // Được dùng lại sau mỗi thao tác tạo/sửa/xoá để UI luôn khớp với DB.
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

  // Tạo content mới: gọi API, chờ thành công rồi nạp lại danh sách.
  const create = async (contTitle, contBody, contType, nichId) => {
    await createContent(contTitle, contBody, contType, nichId);
    await reload();
  };

  // Sửa content theo id: gọi API rồi nạp lại danh sách.
  const edit = async (id, contTitle, contBody, contType) => {
    await editContentById(id, contTitle, contBody, contType);
    await reload();
  };

  // Xoá content theo id: gọi API rồi nạp lại danh sách để phản ánh ngay kết quả.
  const remove = async (id) => {
    await deleteContentById(id);
    await reload();
  };

  return { contents, loading, create, edit, remove };
}

export default useContent;
