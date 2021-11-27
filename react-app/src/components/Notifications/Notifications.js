import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { delNotif, getUserNotif } from "../../store/notification";
import { useHistory } from "react-router";
import "./Notifications.css";

const Notifications = () => {
  const dispatch = useDispatch();
  const { setNum } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [ownNotif, setOwnNotif] = useState(0);

  useEffect(() => {
    dispatch(getUserNotif());
  }, [user]);

  useEffect(() => {
    const filtered = notifications?.filter((n) => n.sender.id === user?.id);
    if (filtered) {
      setOwnNotif(filtered?.length);
    }
  }, [notifications]);

  const redirect = (e, id) => {
    e.stopPropagation();
    history.push(`/users/${id}`);
    setNum(0);
  };

  return (
    <div className="notifications-main">
      {notifications?.length > 0 ? (
        <>
          {notifications.map((n) => (
            <>
              {n.sender.id !== user?.id && (
                <div
                  key={n}
                  className="notif-card"
                  onClick={() => {
                    history.push(n.link);
                    dispatch(delNotif(n.id));
                    setNum(0);
                  }}
                >
                  <img
                    onClick={(e) => redirect(e, n.sender.id)}
                    src={n.sender.image_url}
                    className="notif-img"
                  />
                  <div className="notif-sender">
                    <div className="notif-username">{n.sender.username}</div>
                    <div className="notif-msg">{n.message}</div>
                  </div>
                </div>
              )}
            </>
          ))}
          {notifications?.length > ownNotif && (
            <div className="notif-clear"><div className="clear-click">Clear All</div></div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Notifications;
