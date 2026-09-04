import { useState } from "react";
import { X, Image, EmojiSmile, BarChart, GeoAlt } from "react-bootstrap-icons";
import Avatar from "../avatar/Avatar";
import "../../styles/style.css";

// Khớp với VARCHAR(100) của cont_title
const titleMax = 100;

// Presentational form. Không có logic nghiệp vụ:
// state (title/body), căn lề submit và quyết định create/edit đều do parent đưa vào qua props.
function ContentCreate({
  isOpen,
  onClose,
  title,
  body,
  onTitleChange,
  onBodyChange,
  submitLabel,
  canSubmit,
  onSubmit,
}) {
  // Ảnh chỉ để xem trước cục bộ, chưa upload qua API.
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
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
                // slice(0, titleMax) chặn cứng ở 100 ký tự khi gõ
                onChange={(e) => onTitleChange(e.target.value.slice(0, titleMax))}
                placeholder="What are you posting about?"
              />
              {/* Bộ đếm ký tự; thêm class near-limit khi chạm giới hạn */}
              <span
                className={`content-create-title-counter ${
                  title.length >= titleMax ? "near-limit" : ""
                }`}
              >
                {title.length}/{titleMax}
              </span>
            </div>
          </div>

          <div className="content-create-input d-flex gap-3">
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => onBodyChange(e.target.value)}
              placeholder="Share with everyone about your day..."
            />
          </div>

          {image && (
            <div className="content-image-preview">
              {/* URL.createObjectURL tạo URL tạm để xem trước file cục bộ */}
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

          <button
            type="button"
            className="btn btn-primary content-create-submit"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentCreate;
