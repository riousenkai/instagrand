import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { icon1, icon2, icon3 } from "./icons";
import { logout } from "../../store/session";
import { useModal } from "../../context/UseModal";
import "./NavSettings.css";

const NavSettings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setNum } = useModal();
  const user = useSelector((state) => state.session.user);

  return (
    <div className="nav-modal-main">
      <div
        className="profile-info"
        onClick={() => {
          setNum(0);
          history.push(`/users/${user?.id}`);
        }}
      >
        {icon1}
        <div className="info-title">Profile</div>
      </div>
      <div
        className="profile-info"
        onClick={() => {
          setNum(0);
          history.push(`/settings`);
        }}
      >
        {icon2}
        <div className="info-title">Settings</div>
      </div>
      <div
        className="profile-info"
        onClick={() => {
          setNum(0);
          history.push(`/about`);
        }}
      >
        {icon3}
        <div className="info-title">About the Site Creator</div>
      </div>
      <div
        className="profile-info2"
        onClick={() => {
          setNum(0);
          dispatch(logout());
        }}
      >
        <div className="info-logout">Log Out</div>
      </div>
    </div>
  );
};

export default NavSettings;
