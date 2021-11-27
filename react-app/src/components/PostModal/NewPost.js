import React, { useState, useRef, useEffect } from "react";
import { useModal } from "../../context/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { createPost, findFollowingPosts, findPosts } from "../../store/post";
import { newIcon } from "./newIcons";
import Picker from "emoji-picker-react";

import "./NewPost.css";
import { updateUser } from "../../store/user";

const NewPost = () => {
  const dispatch = useDispatch();
  const emoji = useRef(null);
  const { num, setNum } = useModal();
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState([]);
  const path = window.location.pathname;
  const user = useSelector((state) => state.session.user);
  const [image, setImage] = useState(true);

  useEffect(() => {
    setErrors([]);
  }, [url]);

  const onEmojiClick = (event, emojiObject) => {
    setDesc((older) =>
      older === null ? emojiObject.emoji : older + emojiObject.emoji
    );
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
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

  const submit = () => {
    let err = [];

    if (url.length < 1) {
      err.push("Please provide an image.");
      return setErrors(err);
    }

    if (desc.length > 300) {
      err.push("Caption cannot be over 300 characters.");
    }

    if (image === false) {
      err.push("Please provide an image file.");
    }

    if (err.length > 0) {
      return setErrors(err);
    }

    const obj = {
      file: imgUrl,
      description: desc,
    };

    dispatch(createPost(obj))
      .then(() => dispatch(findFollowingPosts()))
      .then(() => {
        if (path === `/users/${user?.id}`) {
          dispatch(findPosts(user?.id));
          dispatch(updateUser(user?.id));
        }
      });

    setNum(0);
  };

  return (
    <>
      <div className="new-close">
        <img
          className="new-close-img"
          onClick={() => setNum(0)}
          src="https://img.icons8.com/ios-filled/50/ffffff/multiply.png"
        />
      </div>
      <div className="new-post-main">
        <div className="new-top">
          <p className="new-title">Create new post</p>
          <div className="new-submit" onClick={submit}>
            Share
          </div>
        </div>
        <div className="new-post-bot">
          <div className="mid-left">
            {url === "" ? (
              <div className="new-p-preview">
                {newIcon}
                <div className="new-p-video">Upload photos here</div>
                <label className="new-p-upload" for="new-pic">
                  Select from computer
                  <input
                    id="new-pic"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      setUrl(URL.createObjectURL(e.target.files[0]));
                      setImgUrl(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            ) : (
              <img
                className="preview-img"
                src={url}
                onError={() => setImage(false)}
                onLoad={() => setImage(true)}
              />
            )}
          </div>
          <div className="mid-right">
            <div className="new-post-user">
              <img className="new-user-img" src={user.image_url} />
              <p className="new-username">{user.username}</p>
            </div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="new-post-desc"
              placeholder="Write a caption..."
              maxLength="300"
            />
            <div className="emoji-wordcount">
              <div className="emoji-post">
                <img
                  onClick={() => emoji.current.classList.remove("hidden")}
                  className="emoji-btn"
                  src="https://img.icons8.com/ios/50/000000/smiling.png"
                />
                <div className="picker hidden" ref={emoji}>
                  <Picker
                    native={true}
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{
                      position: "absolute",
                      width: "15vw",
                      marginLeft: "-12px",
                    }}
                  />
                </div>
              </div>
              <div className="wordcount">{desc?.length} / 300</div>
            </div>
            {url.length > 0 ? (
              <div
                className="post-url"
                onClick={() => {
                  setUrl("");
                  setImgUrl("");
                }}
              >
                Remove Image
              </div>
            ) : null}
            {errors &&
              errors.map((err) => <div className="post-error">{err}</div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
