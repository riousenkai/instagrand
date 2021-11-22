import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { editProf, authenticate } from "../../store/session";
import { uploadFile } from "../../store/user";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import EditPic from "../EditPicModal/EditPic";
import Picker from "emoji-picker-react";
import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emoji = useRef(null);
  const [count, setCount] = useState(0);
  const { num, setNum } = useModal();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.description);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  useEffect(() => {
    if (success) {
      history.push(`/users/${user?.id}`);
    }
  }, [success]);

  const editProfile = (e) => {
    e.preventDefault();

    const obj = {
      username: username.toLowerCase(),
      bio,
      name,
    };

    dispatch(editProf(obj)).then((data) => {
      if (data) {
        setErrors(data);
      } else {
        setSuccess(true);
      }
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    let copy = bio;
    copy += emojiObject.emoji;
    setBio(copy);
  };

  const showEmoji = () => {
    if (count === 0) {
      emoji.current.classList.remove("hidden");
      setCount(1);
    } else {
      setCount(0);
    }
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        if (
          !e?.target?.classList?.contains("emoji-btn2") &&
          !e?.target?.nextElementSibling?.classList.contains("hidden")
        ) {
          setCount(0);
        }
        if (ref.current && !ref.current.contains(e.target)) {
          emoji.current.classList.add("hidden");
        }
      };
      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref]);
  };

  RemoveOutside(emoji);

  return (
    <div className="settings-main">
      <div className="settings-card">
        <div className="settings-left">
          <div className="settings-e-prof">Edit Profile</div>
        </div>
        <form className="settings-right" onSubmit={(e) => editProfile(e)}>
          <div className="set-r-top">
            <div className="set-r-left-img">
              <img
                className="set-r-img"
                src={user?.image_url}
                onClick={() => setNum(11)}
              />
            </div>
            <div className="set-r-img-set">
              <div className="set-r-username">{user?.username}</div>
              <div
                for="pics"
                className="set-r-change-pic"
                onClick={() => setNum(11)}
              >
                Change Profile Photo
              </div>
            </div>
          </div>
          <div className="set-name">
            <div className="set-r-left">Name</div>
            <div className="set-right-name">
              <input
                className="set-r-input"
                value={name}
                placeholder="Name"
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
                placeholder="Username"
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
            <div className="set-r-left-bio">
              <span className="set-bio">Bio</span>
              <div className="emoji-post4">
                <img
                  onClick={() => showEmoji()}
                  className="emoji-btn2"
                  src="https://img.icons8.com/ios/50/000000/smiling.png"
                />
                <div className="picker hidden" ref={emoji}>
                  <Picker
                    native={true}
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{
                      position: "absolute",
                      width: "15vw",
                      marginLeft: "-25px",
                      top: "30px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="set-right-username">
              <textarea
                placeholder="Bio"
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
          {errors?.length > 0 && (
            <div className="set-username">
              <div className="set-r-left-error">Error</div>
              <div className="set-right-error">
                {errors?.length > 0 &&
                  errors?.map((err) => <div className="edit-err">{err}</div>)}
              </div>
            </div>
          )}
        </form>
      </div>
      {num === 11 && (
        <Modal onClose={() => setNum(0)}>
          <EditPic />
        </Modal>
      )}
    </div>
  );
};

export default Settings;
