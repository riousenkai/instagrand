import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import NewPost from "./NewPost";
import "../Navigation/Navigation.css";

const PostModal = () => {
  const { num, setNum } = useModal();

  return (
    <>
      {num !== 1 ? (
        <img
          onClick={() => setNum(1)}
          className="nav-icons"
          src="https://img.icons8.com/ios/50/000000/plus-2-math.png"
        />
      ) : (
        <img
          onClick={() => setNum(1)}
          className="nav-icons"
          src="https://img.icons8.com/ios-filled/50/000000/plus-2-math.png"
        />
      )}
      {num === 1 && (
        <Modal onClose={() => setNum(0)}>
          <NewPost />
        </Modal>
      )}
    </>
  );
};

export default PostModal;
