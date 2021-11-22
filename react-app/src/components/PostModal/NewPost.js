import React, { useState, useRef, useEffect } from "react";
import { useModal } from "../../context/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { createPost, findFollowingPosts } from "../../store/post";
import Picker from "emoji-picker-react";

import "./NewPost.css";

const NewPost = () => {
  const dispatch = useDispatch();
  const emoji = useRef(null);
  const { num, setNum } = useModal();
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

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
      err.push("Please provide an image link.");
      return setErrors(err);
    }

    const types = ["gif", "jpg", "jpeg", "png", ".com", "www.", "http"];

    let filtered = types.filter((type) => url.includes(type));

    if (filtered.length < 1) {
      err.push("Please submit a valid image link.");
    }

    if (err.length > 0) {
      return setErrors(err);
    }

    const obj = {
      user_id: user.id,
      media_url: url,
      description: desc,
    };

    dispatch(createPost(obj)).then(() => dispatch(findFollowingPosts()));

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
            <img className="preview-img" src={url} />
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
              maxLength="500"
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
              <div className="wordcount">{desc?.length} / 500</div>
            </div>
            <input
              maxLength="300"
              placeholder="Paste image url here..."
              className="post-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {errors &&
              errors.map((err) => <div className="post-error">{err}</div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
