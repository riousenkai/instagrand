import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { getUserNotif } from "../../store/notification";
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

  useEffect(() => {
    dispatch(getUserNotif());
  }, [user]);

  return (
    <>
      {notifications?.length > 0
        ? notifications.slice(0, 5).map((n) => (
            <div key={n} className="notif-card">
              <img src={n.sender.image_url} className="notif-img" />
              <span className="notif-username">{n.sender.username}</span>{" "}
              <span className="notif-msg">{n.message}</span>
            </div>
          ))
        : null}
    </>
  );
};

export default Notifications;
