import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotifModal } from "../../context/NotifModal";
import { useModal } from "../../context/UseModal";
import Notifications from "./Notifications";
import { notifIcon, notifIconFocus, newNotifs } from "../Navigation/NavIcons";
import { readAllNotif, getUserNotif } from "../../store/notification";
import "./Notifications.css";

const NotificationsModal = () => {
  const { num, setNum } = useModal();
  const dispatch = useDispatch();
  const path = window.location.href;
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const user = useSelector((state) => state.session.user);
  const [newN, setNewN] = useState(false);

  useEffect(() => {
    dispatch(getUserNotif());
  }, [path]);

  useEffect(() => {
    const filtered = notifications?.filter(
      (n) => n.read === false && n.sender.id !== user?.id
    );
    if (filtered?.length > 0) {
      setNewN(true);
    } else {
      setNewN(false);
    }
  }, [notifications]);

  return (
    <>
      {num === 55 ? (
        <span
          className="notif-icon"
          onClick={() => {
            dispatch(readAllNotif());
            setNewN(false);
            setNum(0);
          }}
        >
          {notifIconFocus}
        </span>
      ) : newN === false ? (
        <span
          className="notif-icon"
          onClick={() => {
            dispatch(readAllNotif());
            setNewN(false);
            setNum(55);
          }}
        >
          {notifIcon}
        </span>
      ) : (
        <span
          className="notif-icon"
          onClick={() => {
            dispatch(readAllNotif());
            setNewN(false);
            setNum(55);
          }}
        >
          {newNotifs}
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
