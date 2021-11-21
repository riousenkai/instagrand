import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { editProf } from "../../store/session";
import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.description);

  const editProfile = (e) => {
    e.preventDefault();

    const obj = {
      username,
      bio,
      name,
    };

    dispatch(editProf(obj));
    history.push(`/users/${user?.id}`);
  };

  return (
    <div className="settings-main">
      <div className="settings-card">
        <div className="settings-left">
          <div className="settings-e-prof">Edit Profile</div>
        </div>
        <form className="settings-right" onSubmit={(e) => editProfile(e)}>
          <div className="set-r-top">
            <div className="set-r-left-img">
              <img className="set-r-img" src={user?.image_url} />
            </div>
            <div className="set-r-img-set">
              <div className="set-r-username">{user?.username}</div>
              <div className="set-r-change-pic">Change Profile Photo</div>
            </div>
          </div>
          <div className="set-name">
            <div className="set-r-left">Name</div>
            <div className="set-right-name">
              <input
                className="set-r-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="set-right-info">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </div>
            </div>
          </div>
          <div className="set-username">
            <div className="set-r-left">Username</div>
            <div className="set-right-username">
              <input
                className="set-r-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="set-right-info">
                You'll be able to change it back to {user.username} as long as
                it is not picked up by another user.
              </div>
            </div>
          </div>
          <div className="set-username">
            <div className="set-r-left">Bio</div>
            <div className="set-right-username">
              <textarea
                className="set-r-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <div className="set-username">
            <div className="set-r-left"></div>
            <div className="set-right-username">
              <button className="settings-submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
