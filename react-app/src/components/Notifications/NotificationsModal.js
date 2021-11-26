import React from "react";
import { NotifModal } from "../../context/NotifModal";
import { useModal } from "../../context/UseModal";
import Notifications from "./Notifications";
import { notifIcon, notifIconFocus } from "../Navigation/NavIcons";
import "./Notifications.css";

const NotificationsModal = () => {
  const { num, setNum } = useModal();

  return (
    <>
      {num === 55 ? (
        <span className="notif-icon" onClick={() => setNum(0)}>
          {notifIconFocus}
        </span>
      ) : (
        <span className="notif-icon" onClick={() => setNum(55)}>
          {notifIcon}
        </span>
      )}

      {num === 55 && (
        <NotifModal onClose={() => setNum(0)}>
          <Notifications />
        </NotifModal>
      )}
    </>
  );
};

export default NotificationsModal;
