import { useState } from "react";
import { X, Image, EmojiSmile, BarChart, GeoAlt } from "react-bootstrap-icons";
import Avatar from "../avatar/Avatar";
import "../../styles/style.css";

// Khớp với VARCHAR(100) của cont_title
const titleMax = 100;

function ContentCreate({ isOpen, onClose, nichId, editContent, create, edit }) {
  // isEdit quyết định toàn bộ luồng: false = tạo mới (dùng nichId),
  // true = sửa content đã có (giữ nguyên id, bỏ qua nichId).
  const isEdit = !!editContent;

  // State khởi tạo từ editContent khi sửa, rỗng khi tạo.
  const [body, setContent] = useState(editContent ? editContent.contBody : "");
  const [title, setTitle] = useState(editContent ? editContent.contTitle : "");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (isEdit) {
      // Chế độ sửa: giữ nguyên tiêu đề cũ (không lấy title state), chỉ gửi phần body mới.
      await edit(editContent.contId, editContent.contTitle, body.trim(), "post");
    } else {
      await create(title.trim(), body.trim(), "post", nichId);
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="content-create-overlay">
      <div className="content-create-modal">
        <div className="content-create-header d-flex justify-content-between align-items-center">
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
          <div className="content-create-input d-flex gap-2">
            <Avatar isUser={true} className="mt-2"/>

            <div className="content-create-title-wrap">
              <textarea
                className="form-control content-create-title"
                value={title}
                // slice(0, titleMax) chặn cứng ở 100 ký tự khi gõ, không cho vượt giới hạn DB
                onChange={(e) => setTitle(e.target.value.slice(0, titleMax))}
                placeholder="What are you posting about?"
              />
              {/* Bộ đếm ký tự; thêm class near-limit để đổi màu khi chạm giới hạn */}
              <span
                className={`content-create-title-counter ${
                  title.length >= titleMax ? "near-limit" : ""
                }`}
              >
                {title.length}/{titleMax}
              </span>
            </div>
          </div>

          {/* Input file ẩn ở footer kích hoạt qua <label htmlFor>, xử lý qua handleImageChange */}
          <div className="content-create-input d-flex gap-3">
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share with everyone about your day..."
            />
          </div>

          {image && (
            <div className="content-image-preview">
              {/* URL.createObjectURL tạo URL tạm để xem trước file cục bộ chưa upload */}
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
          <div className="content-create-tools d-flex align-items-center">
            <label
              htmlFor="content-image-input"
              className="content-create-tool"
              title="Add image"
            >
              <Image size={20} />
            </label>

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

          {/* disabled khi body rỗng: không cho post nội dung trống, chỉ dựa vào body chứ không phải title */}
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
