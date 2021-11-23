import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findFollows, findSuggestions, followUser } from "../../store/follow";
import {
  findFollowingPosts,
  findPosts,
  submitComment,
  likePost,
} from "../../store/post";
import { useHistory } from "react-router";
import Picker from "emoji-picker-react";
import "./Home.css";
import OptionsModal from "../Options/OptionsModal";
import { useModal } from "../../context/UseModal";
import { Modal } from "../../context/Modal";
import { icon1, icon2, icon3 } from "./icons";
import { logout } from "../../store/session";
import Likes from "../Likes/Likes";
import Unfollow from "../UserProfile/Unfollow";

const Home = () => {
  const history = useHistory();
  const emojis = useRef([]);
  const dispatch = useDispatch();
  const [currEmoji, setCurrEmoji] = useState("");
  const [currInput, setCurrInput] = useState();
  const [open, setOpen] = useState(0);
  const { num, setNum } = useModal();
  const [count, setCount] = useState(0);
  const [src, setSrc] = useState("");
  const [unfollowed, setUnfollowed] = useState();
  const user = useSelector((state) => state.session.user);
  const followingPosts = useSelector((state) => state.post.following);
  const suggestions = useSelector((state) => state.follow.users);
  const following = useSelector((state) => state.follow[user?.id]?.following);
  const [inputs, setInputs] = useState(
    new Array(followingPosts?.length).fill("")
  );
  const [loaded, setLoaded] = useState(
    new Array(followingPosts?.length).fill(false)
  );

  useEffect(() => {
    updateInput(currInput);
  }, [count]);

  useEffect(() => {
    dispatch(findFollows(user?.id));
    dispatch(findPosts(user?.id));
    dispatch(findSuggestions());
  }, []);

  useEffect(() => {
    dispatch(findFollowingPosts());
  }, [user]);

  useEffect(() => {
    setInputs(new Array(followingPosts?.length).fill(""));
    setLoaded(new Array(followingPosts?.length).fill(false));
  }, [followingPosts]);

  const updateInput = (index) => {
    let arr = [...inputs];
    arr[index] += currEmoji;
    setInputs(arr);
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        if (
          !e?.target?.classList?.contains("emoji-btn2") &&
          !e?.target?.nextElementSibling?.classList.contains("hidden")
        ) {
          setOpen(0);
        }
        ref.current.forEach((r, i) => {
          if (ref.current[i] && !ref.current[i].contains(e.target)) {
            emojis.current[i].classList.add("hidden");
          }
        });
      };
      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref]);
  };

  RemoveOutside(emojis);

  const update = (e, i) => {
    let arr = [...inputs];
    arr[i] = e.target.value;
    setInputs(arr);
  };

  const loadIt = (i) => {
    let arr = [...loaded];
    document.querySelector(`.post-img-${i}`).classList.add("hidden");
    document.querySelector(`.loaded-img-${i}`).classList.remove("hidden");
    arr[i] = true;
    setLoaded(arr);
  };

  const onEmojiClick = (event, emojiObject) => {
    setCurrEmoji(emojiObject.emoji);
    setCount((old) => old + 1);
  };

  const show = (i) => {
    if (open === 0) {
      emojis.current[i].classList.remove("hidden");
      setOpen(1);
    } else {
      setOpen(0);
    }
  };

  const newComment = (index, postId) => {
    if (inputs[index].length < 1) {
      return;
    }

    const obj = {
      user_id: +user.id,
      post_id: +postId,
      description: inputs[index],
    };

    dispatch(submitComment(obj));
  };

  const like = (id, p) => {
    if (p.find((post) => post.id === user.id) === undefined) {
      setSrc(
        "https://instagrand-aa.s3.us-east-2.amazonaws.com/output-onlinegiftools+(1).gif"
      );
      document.querySelector(`.liked-img-${id}`).classList.remove("hidden");

      setTimeout(() => {
        document.querySelector(`.liked-img-${id}`).classList.add("hidden");
        setSrc("");
      }, 1000);
    }
    dispatch(likePost(id));
  };

  const like2 = (id) => {
    dispatch(likePost(id));
  };

  const follow = (id) => {
    dispatch(followUser(id)).then(() => dispatch(findFollows(user?.id)));
  };

  return (
    <>
      {followingPosts?.length < 1 ? (
        <div className="new-main">
          Please submit a new post or search for people to follow to populate
          your home feed.
        </div>
      ) : (
        <div className="home-main">
          <div className="home-left">
            <div className="home-posts">
              {followingPosts?.map((post, i) => (
                <div className="post-card">
                  <div className="post-top">
                    <div className="post-top-left">
                      <img
                        onClick={() => history.push(`/users/${post.user.id}`)}
                        className="post-user-img"
                        src={post.user.image_url}
                      />
                      <div
                        onClick={() => history.push(`/users/${post.user.id}`)}
                        className="post-name"
                      >
                        {post.user.username}
                      </div>
                    </div>
                    <div className="post-top-right">
                      <OptionsModal post={post} />
                    </div>
                  </div>
                  <img
                    className={`post-img-loading post-img-${i}`}
                    src="https://flevix.com/wp-content/uploads/2019/07/Ball-Drop-Preloader-1-1.gif"
                  />
                  <img
                    onDoubleClick={() => like(post.post.id, post.likes)}
                    className={`post-img loaded-img-${i} hidden`}
                    onLoad={() => loadIt(i)}
                    src={post.post.media_url}
                  />
                  <img
                    className={`img-absolute liked-img-${post.post.id} hidden`}
                    src={src}
                  />
                  <div className="post-icons">
                    {post.likes.find((p) => p.id === user.id) !== undefined ? (
                      <div
                        className="post-icon"
                        onClick={() => like2(post.post.id)}
                      >
                        {icon2}
                      </div>
                    ) : (
                      <div
                        className="post-icon"
                        onClick={() => like2(post.post.id)}
                      >
                        {icon1}
                      </div>
                    )}
                    <div
                      className="post-icon"
                      onClick={() => history.push(`/posts/${post.post.id}`)}
                    >
                      {icon3}
                    </div>
                  </div>
                  {post.likes.length > 0 ? (
                    <div className="post-likes">
                      {post.likes.length}{" "}
                      {post.likes.length === 1 ? "like" : "likes"}
                    </div>
                  ) : null}
                  {post.post.description.length > 0 ? (
                    <div className="post-u-d">
                      <div
                        onClick={() => history.push(`/users/${post.user.id}`)}
                        className="post-user"
                      >
                        {post.user.username}
                      </div>
                      <div className="post-desc">
                        {post.post.description.split("\n").length > 1
                          ? post.post.description
                              .split("\n")
                              .slice(0, 1)
                              .map((sentence) => (
                                <>
                                  {sentence}{" "}
                                  <span
                                    className="p-dots"
                                    onClick={() =>
                                      history.push(`/posts/${post.post.id}`)
                                    }
                                  >
                                    ...
                                  </span>
                                </>
                              ))
                          : post.user.username.length +
                              post.post.description.length >
                            55
                          ? post.post.description.slice(0, 45) + "..."
                          : post.post.description}
                      </div>
                    </div>
                  ) : null}
                  <div
                    className="post-comment-count"
                    onClick={() => history.push(`/posts/${post.post.id}`)}
                  >
                    {post.comments?.length > 1
                      ? `View all ${post.comments.length} comments`
                      : null}
                  </div>
                  <div className="post-comments">
                    {post.comments.length > 0 &&
                      post.comments.slice(0, 1).map((comment) => (
                        <div className="post-test">
                          <div
                            className="post-commenter-name"
                            onClick={() =>
                              history.push(`/users/${comment.user.id}`)
                            }
                          >
                            {comment.user.username}
                          </div>
                          <div className="post-comment">
                            {comment.user.username.length +
                              comment.comment.description?.length >
                            50
                              ? comment.comment.description.slice(0, 40) + "..."
                              : comment.comment.description}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="post-time">
                    {post.post.createdAt.split(" ").slice(1, 4).join(" ")}
                  </div>
                  <div className="comment-input">
                    <div className="emoji-wordcount-2">
                      <div className="emoji-post2">
                        <img
                          onClick={() => show(post.post.id)}
                          className="emoji-btn2"
                          src="https://img.icons8.com/ios/50/000000/smiling.png"
                        />
                        <div
                          className="picker hidden"
                          ref={(el) => (emojis.current[post.post.id] = el)}
                          onMouseUp={() => setCurrInput(i)}
                        >
                          <Picker
                            native={true}
                            onEmojiClick={onEmojiClick}
                            pickerStyle={{
                              position: "absolute",
                              width: "15vw",
                              marginLeft: "-12px",
                              top: "-330px",
                              zIndex: "0",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      onKeyPress={(e) =>
                        e.key === "Enter" && newComment(i, post.post.id)
                      }
                      placeholder="Add a comment..."
                      className="post-comment-input"
                      value={inputs[i]}
                      onChange={(e) => update(e, i)}
                    />
                    <div
                      className="post-submit-comment"
                      onClick={(e) => newComment(i, post.post.id)}
                    >
                      Post
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="home-right">
            <div className="h-right-user">
              <img
                className="hr-user-img"
                onClick={() => history.push(`/users/${user.id}`)}
                src={user?.image_url}
              />
              <div className="h-r-info">
                <div
                  className="h-r-username"
                  onClick={() => history.push(`/users/${user.id}`)}
                >
                  {user?.username}
                </div>
                <div className="h-r-name">{user?.name}</div>
              </div>
              <div className="h-r-switch" onClick={() => dispatch(logout())}>
                Switch
              </div>
            </div>
            <div className="h-suggestions">
              <div className="suggestions-title">Suggestions for You</div>
              <div className="suggestions-list">
                {suggestions?.length > 0
                  ? suggestions?.slice(0, 5).map((s) => (
                      <>
                        {num === s.id && (
                          <Modal onClose={() => setNum(0)}>
                            <Unfollow user={unfollowed} />
                          </Modal>
                        )}
                        <div className="suggestion-card">
                          <img
                            onClick={() => history.push(`/users/${s.id}`)}
                            className="suggestion-img"
                            src={s.image_url}
                          />
                          <div className="s-user-info">
                            <div
                              className="s-username"
                              onClick={() => history.push(`/users/${s.id}`)}
                            >
                              {s.username}
                            </div>
                            <div className="s-name">{s.name}</div>
                          </div>
                          {following?.find((u) => u.id === s.id) ===
                          undefined ? (
                            <div
                              className="s-follow"
                              onClick={() => follow(s.id)}
                            >
                              Follow
                            </div>
                          ) : (
                            <div
                              className="s-unfollow"
                              onClick={() => {
                                setUnfollowed(s);
                                setNum(s.id + 15);
                              }}
                            >
                              Following
                            </div>
                          )}
                        </div>
                      </>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
