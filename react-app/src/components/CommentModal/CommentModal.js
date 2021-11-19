import React from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import CommentSettings from "./CommentSettings";
import "./CommentSettings.css";

const CommentModal = ({ comment, hidden }) => {
  const { commentId, setCommentId } = useModal();

  return (
    <>
      <img
        className="comment-options"
        hidden={hidden}
        onClick={() => setCommentId(comment.comment.id)}
        src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
        // src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-solid-kiranshastry.png"
      />
      {commentId === comment.comment.id && (
        <Modal onClose={() => setCommentId(0)}>
          <CommentSettings comment={comment} />
        </Modal>
      )}
    </>
  );
};

export default CommentModal;
