import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { icon1, icon2 } from "./icons";
import { logout } from "../../store/session";
import './NavSettings.css'

const NavSettings = () => {
    const dispatch = useDispatch()
    const history = useHistory()
  const user = useSelector(state => state.session.user)

  return (
    <div className="nav-modal-main">
      <div className="profile-info" onClick={() => history.push(`/users/${user?.id}`)}>
        {icon1}
        <div className="info-title">Profile</div>
      </div>
      <div className="profile-info" onClick={() => history.push(`/settings`)}>
        {icon2}
        <div className="info-title">Settings</div>
      </div>
      <div className="profile-info2" onClick={() => logout()}>
        <div className="info-logout">Log Out</div>
      </div>
    </div>
  );
};

export default NavSettings;
