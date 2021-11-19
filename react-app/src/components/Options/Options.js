import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { deletePost, editPost } from "../../store/post";
import Picker from "emoji-picker-react";
import "./Options.css";

const Options = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emoji = useRef(null);
  const { postId, setPostId } = useModal();
  const user = useSelector((state) => state.session.user);
  const [input, setInput] = useState(post.post.description);

  const onEmojiClick = (event, emojiObject) => {
    setInput((older) =>
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

  const goodbye = () => {
    document.querySelector(".hide-options").classList.add("hidden");
    document.querySelector(".delete-conf").classList.remove("hidden");
  };

  const del = () => {
    dispatch(deletePost(post.post.id));
    setPostId(0);
  };

  const edit = () => {
    document.querySelector(".hide-options").classList.add("hidden");
    document.querySelector(".edit-it").classList.remove("hidden");
  };

  const submitEdit = () => {
    const obj = {
      description: input,
    };

    dispatch(editPost(obj, post.post.id));
    setPostId(0);
  };

  return (
    <div className="options-modal">
      <div className="hide-options">
        {user?.id === post?.user.id ? (
          <>
            <div onClick={goodbye} className="delete-post">
              Delete post
            </div>
            <div className="edit-post" onClick={edit}>
              Edit caption
            </div>
          </>
        ) : (
          <div className="unfollow-post">Unfollow</div>
        )}
        <div
          onClick={() => {
            history.push(`/posts/${post.post.id}`);
            setPostId(0);
          }}
          className="goto-post-b"
        >
          Go to post
        </div>
        <div className="goto-post" onClick={() => setPostId(0)}>
          Cancel
        </div>
      </div>
      <div className="delete-conf hidden">
        <div className="del-conf-top">
          <p className="del-title">Delete Post?</p>
          <p className="del-desc">Are you sure you want to delete this post?</p>
        </div>
        <div className="delete-post" onClick={del}>
          Delete
        </div>
        <div className="goto-post" onClick={() => setPostId(0)}>
          Cancel
        </div>
      </div>
      <div className="edit-it hidden">
        <div className="edit-it-top">
          <div className="emoji-post-3">
            <img
              onClick={() => emoji.current.classList.remove("hidden")}
              className="emoji-btn editb"
              src="https://img.icons8.com/ios/50/000000/smiling.png"
            />
            <div className="picker hidden" ref={emoji}>
              <Picker
                native={true}
                onEmojiClick={onEmojiClick}
                pickerStyle={{
                  position: "absolute",
                  width: "15vw",
                  marginLeft: "-20px",
                  top: "110px",
                }}
              />
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="edit-it-input"
          />
        </div>
        <div className="submit-edit" onClick={submitEdit}>
          Submit
        </div>
        <div className="goto-post" onClick={() => setPostId(0)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default Options;
