import { useSelector } from "react-redux";
import "./Settings.css";

const Settings = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="settings-main">
      <div className="settings-card">
          <div className="settings-left">
                <div className="settings-e-prof">
                    Edit Profile
                </div>
          </div>
          <div className="settings-right">
                <div className="set-r-top">
                    <img className="set-r-img" src={user?.image_url} />
                    <div className="set-r-img-set">
                    <div className="set-r-username">{user?.username}</div>
                    <div className="set-r-change-pic">Change Profile Photo</div>
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;
