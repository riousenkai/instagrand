import React from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import PostOptions from "./PostOptions";

const PostOptionsModal = ({ post }) => {
  const { postId, setPostId } = useModal();

  return (
    <>
      <img
        className="post-options2"
        onClick={() => setPostId(post?.post.id)}
        src="https://img.icons8.com/material-two-tone/24/000000/more.png"
      />
      {postId === post?.post.id && (
        <Modal onClose={() => setPostId(0)}>
          <PostOptions post={post} />
        </Modal>
      )}
    </>
  );
};

export default PostOptionsModal;
