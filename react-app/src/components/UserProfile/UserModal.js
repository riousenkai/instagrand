import React from "react";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import Unfollow from "./Unfollow";
import "./UserProfile.css";

const UserModal = ({ user }) => {
  const { num, setNum } = useModal();

  return (
    <>
      <button className="prof-following" onClick={() => setNum(8)}>
        <img
          className="prof-f-img"
          src="https://img.icons8.com/material-sharp/24/000000/checked-user-male.png"
        />
      </button>
      {num === 8 && (
        <Modal onClose={() => setNum(0)}>
          <Unfollow user={user} />
        </Modal>
      )}
    </>
  );
};

export default UserModal;
