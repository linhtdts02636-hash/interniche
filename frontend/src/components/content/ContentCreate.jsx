import { useState } from "react";
import { X, Image, EmojiSmile, BarChart, GeoAlt } from "react-bootstrap-icons";
import Avatar from "../avatar/Avatar";
import "../../styles/style.css";

// Giới hạn độ dài tiêu đề, khớp với VARCHAR(100) ở backend
const titleMax = 100;

// Component tạo/sửa content trong modal overlay.
// - isOpen, onClose: điều khiển hiện/ẩn modal
// - nichId: niche mà content mới thuộc về (chỉ dùng khi tạo)
// - editContent: nếu có -> đang ở chế độ sửa, nếu null -> chế độ tạo
// - create, edit: các hàm thao tác từ useContent
function ContentCreate({ isOpen, onClose, nichId, editContent, create, edit }) {
  // isEdit = true khi component đang sửa content đã có
  const isEdit = !!editContent;

  // state phần nội dung chính (body), khởi tạo từ content hiện tại nếu đang sửa
  const [body, setContent] = useState(
    editContent ? editContent.contBody : ""
  );

  // state tiêu đề, khởi tạo từ content hiện tại nếu đang sửa
  const [title, setTitle] = useState(
    editContent ? editContent.contTitle : ""
  );

  // state ảnh đính kèm (nếu người dùng chọn file)
  const [image, setImage] = useState(null);

  // Lưu file ảnh được chọn vào state để hiển thị preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // Xử lý submit (tạo mới hoặc lưu sửa) dựa vào isEdit
  const handleSubmit = async () => {
    if (isEdit) {
      // Khi sửa: giữ nguyên tiêu đề cũ, chỉ cập nhật part body
      await edit(
        editContent.contId,
        editContent.contTitle,
        body.trim(),
        "post",
      );
    } else {
      // Khi tạo: gửi tiêu đề + body + loại 'post' + id niche
      await create(title.trim(), body.trim(), "post", nichId);
    }
    onClose();
  };

  // Không render gì khi modal đóng
  if (!isOpen) {
    return null;
  }

  return (
    <div className="content-create-overlay">
      <div className="content-create-modal">
        <div className="content-create-header d-flex justify-content-between align-items-center">
          {/* Nút đóng modal */}
          <button
            type="button"
            className="btn content-create-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="content-create-body">
          {/* Hàng nhập tiêu đề: avatar + textarea + bộ đếm ký tự */}
          <div className="content-create-input d-flex gap-2">
            <Avatar isUser={true} className="mt-2"/>

            <div className="content-create-title-wrap">
              <textarea
                className="form-control content-create-title"
                value={title}
                // Cắt chuỗi ở 100 ký tự khi gõ, không cho vượt giới hạn
                onChange={(e) => setTitle(e.target.value.slice(0, titleMax))}
                placeholder="What are you posting about?"
              />
              {/* Bộ đếm ký tự, đổi màu khi chạm giới hạn */}
              <span
                className={`content-create-title-counter ${
                  title.length >= titleMax ? "near-limit" : ""
                }`}
              >
                {title.length}/{titleMax}
              </span>
            </div>
          </div>

          {/* Hàng nhập phần nội dung chính */}
          <div className="content-create-input d-flex gap-3">
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share with everyone about your day..."
            />
          </div>

          {/* Preview ảnh đã chọn kèm nút xoá */}
          {image && (
            <div className="content-image-preview">
              <img src={URL.createObjectURL(image)} alt="Preview" />

              <button
                type="button"
                className="content-image-remove"
                onClick={() => setImage(null)}
                aria-label="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="content-create-footer d-flex align-items-center justify-content-between">
          {/* Thanh công cụ: ảnh, GIF, emoji, poll, vị trí */}
          <div className="content-create-tools d-flex align-items-center">
            <label
              htmlFor="content-image-input"
              className="content-create-tool"
              title="Add image"
            >
              <Image size={20} />
            </label>

            {/* Input chọn ảnh ẩn, kích hoạt qua label ở trên */}
            <input
              id="content-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            <button
              type="button"
              className="content-create-tool"
              title="Add GIF"
            >
              GIF
            </button>

            <button
              type="button"
              className="content-create-tool"
              title="Add emoji"
            >
              <EmojiSmile size={20} />
            </button>

            <button
              type="button"
              className="content-create-tool"
              title="Create poll"
            >
              <BarChart size={20} />
            </button>

            <button
              type="button"
              className="content-create-tool"
              title="Add location"
            >
              <GeoAlt size={20} />
            </button>
          </div>

          {/* Nút gửi; vô hiệu hoá khi body rỗng */}
          <button
            type="button"
            className="btn btn-primary content-create-submit"
            onClick={handleSubmit}
            disabled={!body.trim()}
          >
            {isEdit ? "Save" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentCreate;
