import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import NewPost from "./NewPost";
import { newPostIcon, postIconActive } from "../Home/icons";
import "../Navigation/Navigation.css";

const PostModal = () => {
  const { num, setNum } = useModal();

  return (
    <>
      {num !== 1 ? (
        <div
          onClick={() => setNum(1)}
          className="nav-icons"
        >
          {newPostIcon}
        </div>
      ) : (
        <div
          onClick={() => setNum(1)}
          className="nav-icons"
        >
          {postIconActive}
        </div>
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
