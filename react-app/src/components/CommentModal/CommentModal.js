import React from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import CommentSettings from "./CommentSettings";
import './CommentSettings.css'

const OptionsModal = ({ comment }) => {
  const { commentId, setCommentId } = useModal();

  return (
    <>
      <img
        className="comment-options"
        onClick={() => setCommenttId(post.post.id)}
        src="https://img.icons8.com/material-two-tone/24/000000/more.png"
      />
      {commentId === comment.id && (
        <Modal onClose={() => setCommentId(0)}>
          <CommentSettings comment={comment} />
        </Modal>
      )}
    </>
  );
};

export default OptionsModal;
