import React from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import Options from "./Options";
import "./Options.css";

const OptionsModal = ({ post }) => {
  const { postId, setPostId } = useModal();

  return (
    <>
      <img
        className="post-options"
        onClick={() => setPostId(post?.post.id)}
        src="https://img.icons8.com/material-two-tone/24/000000/more.png"
      />
      {postId === post?.post.id && (
        <Modal onClose={() => setPostId(0)}>
          <Options post={post} />
        </Modal>
      )}
    </>
  );
};

export default OptionsModal;
