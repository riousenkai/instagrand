import React from "react";
import { NewModal } from "../../context/NewModal";
import { useModal } from "../../context/UseModal";
import NavSettings from "./NavSettings";
import "../Navigation/Navigation.css";

const NavModal = ({ user, path }) => {
  const { num, setNum } = useModal();

  const position = () => {
    setNum(4);
  };

  return (
    <>
      <div
        className="nav-prof-border"
        style={{
          visibility:
            num !== 4 && path !== `/users/${user.id}` ? "hidden" : "visible",
        }}
      >
        <img
          className="nav-prof"
          onClick={position}
          src={user.image_url}
          style={{ visibility: "visible" }}
        />
      </div>
      {num === 4 && (
        <NewModal onClose={() => setNum(0)}>
          <NavSettings />
        </NewModal>
      )}
    </>
  );
};

export default NavModal;
