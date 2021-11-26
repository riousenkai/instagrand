import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { getUserNotif } from "../../store/notifications";

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    dispatch(getUserNotif());
  }, [user]);

  return (
    <div>
      <div>DS</div>
    </div>
  );
};

export default Notifications;
