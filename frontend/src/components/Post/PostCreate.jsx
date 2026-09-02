import { useState } from "react";
import { X, Image, EmojiSmile, BarChart, GeoAlt } from "react-bootstrap-icons";

import Avatar from "../Avatar/Avatar";
import "../../styles/style.css";
import "../../styles/PostCreate.css"

function PostCreate({ isOpen, onClose }) {
  // Nội dung bài viết
  const [content, setContent] = useState("");

  // Hình ảnh được chọn
  const [image, setImage] = useState(null);

  // Xử lý khi chọn hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  // Xử lý nút Post
  const handlePost = () => {
    if (!content.trim() && !image) {
      return;
    }

    console.log("Content:", content);
    console.log("Image:", image);

    // Sau này sẽ gửi dữ liệu lên backend ở đây

    setContent("");
    setImage(null);
    onClose();
  };

  // Nếu modal không mở thì không hiển thị gì
  if (!isOpen) {
    return null;
  }

  return (
    // =========================
    // Overlay
    // =========================
    <div className="post-create-overlay">
      {/* =========================
          Modal
          ========================= */}
      <div className="post-create-modal">
        {/* =========================
            Header
            ========================= */}
        <div className="post-create-header d-flex justify-content-between align-items-center">
          {/* Nút X đóng modal */}
          <button
            type="button"
            className="btn post-create-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        {/* End Header */}

        {/* =========================
            Body
            ========================= */}
        <div className="post-create-body">
          {/* Avatar + Textarea */}
          <div className="post-create-input d-flex gap-3">
            <Avatar />

            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          {/* End Avatar + Textarea */}

          {/* =========================
              Image Preview
              ========================= */}
          {image && (
            <div className="post-image-preview">
              <img src={URL.createObjectURL(image)} alt="Preview" />

              {/* Nút X xóa ảnh */}
              <button
                type="button"
                className="post-image-remove"
                onClick={() => setImage(null)}
                aria-label="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          )}
          {/* End Image Preview */}
        </div>
        {/* End Body */}

        {/* =========================
            Footer
            ========================= */}
        <div className="post-create-footer d-flex align-items-center justify-content-between">
          {/* =========================
              Các công cụ bên trái
              ========================= */}
          <div className="post-create-tools d-flex align-items-center">
            {/* Thêm hình ảnh */}
            <label
              htmlFor="post-image-input"
              className="post-create-tool"
              title="Add image"
            >
              <Image size={20} />
            </label>

            <input
              id="post-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            {/* GIF */}
            <button type="button" className="post-create-tool" title="Add GIF">
              GIF
            </button>

            {/* Emoji */}
            <button
              type="button"
              className="post-create-tool"
              title="Add emoji"
            >
              <EmojiSmile size={20} />
            </button>

            {/* Poll */}
            <button
              type="button"
              className="post-create-tool"
              title="Create poll"
            >
              <BarChart size={20} />
            </button>

            {/* Location */}
            <button
              type="button"
              className="post-create-tool"
              title="Add location"
            >
              <GeoAlt size={20} />
            </button>
          </div>
          {/* End Tools */}

          {/* =========================
              Nút Post
              ========================= */}
          <button
            type="button"
            className="btn btn-primary post-create-submit"
            onClick={handlePost}
            disabled={!content.trim() && !image}
          >
            Post
          </button>
          {/* End Post Button */}
        </div>
        {/* End Footer */}
      </div>
      {/* End Modal */}
    </div>
    // End Overlay
  );
}

export default PostCreate;
