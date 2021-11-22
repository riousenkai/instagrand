import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findFollows, followUser } from "../../store/follow";
import {
  findFollowingPosts,
  postInfo,
  likePost,
  submitComment,
  findPosts,
} from "../../store/post";
import { useModal } from "../../context/UseModal";
import Unfollow from "../UserProfile/Unfollow";
import { Modal } from "../../context/Modal";
import { icon1, icon2, icon3, icon4 } from "../Home/icons";
import Picker from "emoji-picker-react";
import "./Post.css";
import CommentModal from "../CommentModal/CommentModal";
import PostOptionsModal from "./PostOptionsModal";

const Post = () => {
  const history = useHistory();
  const { num, setNum } = useModal();
  const emoji = useRef(null);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [focus, setFocus] = useState(false);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const post = useSelector((state) => state.post?.specific);
  const userPosts = useSelector((state) => state.post[post?.user?.id]?.posts);
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follow[user?.id]?.following);
  const load = useSelector((state) => state.post.following);
  const [hidden, setHidden] = useState(
    new Array(post?.comments?.length).fill(true)
  );

  useEffect(() => {
    dispatch(postInfo(+postId));
    dispatch(findFollows(user?.id));
  }, [postId, user, load]);

  useEffect(() => {
    dispatch(findPosts(post?.user?.id));
  }, [post]);

  useEffect(() => {
    const arr = new Array(post?.comments.length).fill(true);
    setHidden(arr);
  }, [post?.comments]);

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

  const follow = () => {
    dispatch(followUser(post?.user.id)).then(() =>
      dispatch(findFollowingPosts(user?.id))
    );
  };

  const showEmoji = () => {
    if (count === 0) {
      emoji.current.classList.remove("hidden");
      setCount(1);
    } else {
      setCount(0);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    let copy = input;
    copy += emojiObject.emoji;
    setInput(copy);
  };

  const like = (id) => {
    dispatch(likePost(id)).then(() => dispatch(findFollowingPosts(user?.id)));
  };

  const newComment = (postId) => {
    if (input.length < 1) {
      return;
    }

    const obj = {
      user_id: +user.id,
      post_id: +postId,
      description: input,
    };

    dispatch(submitComment(obj));
    setInput("");
  };

  const showDelete = (i) => {
    let arr = [...hidden];
    arr[i] = false;
    setHidden(arr);
  };

  const hideDelete = (i) => {
    let arr = [...hidden];
    arr[i] = true;
    setHidden(arr);
  };

  const loadPost = () => {
    document.querySelector(".pp-img-load").classList.add("hidden");
    document.querySelector(".pp-img").classList.remove("hidden");
  };

  const loadIt = (i) => {
    document.querySelector(`.pl-img-${i}`).classList.add("hidden");
    document.querySelector(`.p-img-${i}`).classList.remove("hidden");
  };

  return (
    <div className="post-main">
      <div className="p-main-top">
        <div className="p-card">
          <img
            className="pp-img-load"
            src="https://flevix.com/wp-content/uploads/2019/07/Ball-Drop-Preloader-1-1.gif"
          />
          <img
            className="pp-img hidden"
            onLoad={loadPost}
            src={post?.post?.media_url}
          />
          <div className="pp-right">
            <div className="pp-top-right">
              <img
                className="pp-user-img"
                src={post?.user?.image_url}
                onClick={() => history.push(`/users/${post?.user?.id}`)}
              />
              <div
                className="pp-user"
                onClick={() => history.push(`/users/${post?.user?.id}`)}
              >
                {post?.user?.username}
              </div>
              {post?.user?.id !== user?.id ? (
                following?.find((f) => f.id === post?.user?.id) !==
                undefined ? (
                  <div className="pp-follow" onClick={() => setNum(8)}>
                    •<span className="p-follow">Following</span>
                  </div>
                ) : (
                  <div className="pp-follow" onClick={follow}>
                    •<span className="p-follow p-follow-me">Follow</span>
                  </div>
                )
              ) : null}
              {post?.user?.id === user?.id ? (
                <PostOptionsModal post={post} />
              ) : null}
            </div>
            <div className="pp-mid">
              <div className="pp-com">
                {post?.post?.description !== "" ? (
                  <>
                    <div className="pp-com-info">
                      <img
                        className="pp-user-img"
                        src={post?.user?.image_url}
                        onClick={() => history.push(`/users/${post?.user?.id}`)}
                      />
                      <div className="pp-user-desc">
                        <p className="pp-p">
                          <span
                            className="pp-user"
                            onClick={() =>
                              history.push(`/users/${post?.user?.id}`)
                            }
                          >
                            {post?.user?.username}
                          </span>
                          <span className="pp-desc">
                            {post?.post?.description
                              .split("\n")
                              .map((sentence) => (
                                <>
                                  {sentence}
                                  <br />
                                </>
                              ))}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="pp-date">
                      {post?.post?.createdAt.split(" ").slice(1, 4).join(" ")}
                    </div>
                  </>
                ) : null}
                {post?.comments?.map((p, i) => (
                  <span
                    onMouseEnter={
                      p.user.id === user?.id ? () => showDelete(i) : null
                    }
                    onMouseLeave={() => hideDelete(i)}
                  >
                    <div className="pp-com-info">
                      <img
                        className="pp-user-img"
                        src={p.user?.image_url}
                        onClick={() => history.push(`/users/${p?.user?.id}`)}
                      />
                      <div className="pp-user-desc">
                        <p className="pp-p">
                          <span
                            className="pp-user"
                            onClick={() =>
                              history.push(`/users/${p?.user?.id}`)
                            }
                          >
                            {p?.user?.username}
                          </span>
                          <span className="pp-desc">
                            {p?.comment?.description}
                          </span>
                        </p>
                      </div>
                      {/* <div className="pp-user-desc">
                        <div
                          className="pp-user"
                          onClick={() => history.push(`/users/${p?.user?.id}`)}
                        >
                          {p?.user?.username}
                        </div>
                        <div className="pp-d-d">
                          <span className="pp-desc">
                            {p?.comment?.description}
                          </span>
                        </div>
                      </div> */}
                    </div>
                    <div className="pp-date">
                      {p?.comment?.createdAt.split(" ").slice(1, 4).join(" ")}
                      <CommentModal comment={p} hidden={hidden[i]} />
                    </div>
                  </span>
                ))}
              </div>
            </div>
            <div className="post-icons-2">
              {post?.likes?.length > 0 &&
              post?.likes?.find((p) => p.id === user.id) !== undefined ? (
                <div className="post-icon" onClick={() => like(post.post.id)}>
                  {icon2}
                </div>
              ) : (
                <div className="post-icon" onClick={() => like(post.post.id)}>
                  {icon1}
                </div>
              )}
              <div
                className="post-icon"
                onClick={() => history.push(`/posts/${post.post.id}`)}
              >
                {focus === true ? (
                  icon4
                ) : (
                  <span
                    onClick={() => document.querySelector(".pp-input").focus()}
                  >
                    {icon3}
                  </span>
                )}
              </div>
            </div>
            {post?.likes?.length > 0 ? (
              <div className="pp-likes">
                {post?.likes.length}{" "}
                {post?.likes.length === 1 ? "like" : "likes"}
              </div>
            ) : (
              <div className="pp-nolikes">
                Be the first to{" "}
                <span className="pp-like-me" onClick={() => like(post.post.id)}>
                  like this
                </span>
              </div>
            )}
            <div className="pp-p-d">
              {post?.post?.createdAt.split(" ").slice(1, 4).join(" ")}
            </div>
            <div className="p-c-i">
              <div className="emoji-post2">
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
                      marginLeft: "-12px",
                      top: "-330px",
                    }}
                  />
                </div>
              </div>
              <input
                className="pp-input"
                onKeyUp={(e) => e.key === "Enter" && newComment(post?.post?.id)}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a comment..."
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              <div
                className="pp-submit"
                onClick={(e) => newComment(post?.post?.id)}
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
      {post?.user?.id !== user?.id ? (
        <div className="p-bot">
          <div className="p-bot-desc">
            {userPosts?.length > 1
              ? "More posts from "
              : "No additional posts from "}
            <span
              className="pp-like-me"
              onClick={() => history.push(`/users/${post.user.id}`)}
            >
              {post?.user?.username}
            </span>
          </div>
          <div className="pp-prof-bot">
            {userPosts?.length > 0
              ? userPosts?.slice(0, 6).map((post, i) => (
                  <div
                    className="post-c"
                    onClick={() => history.push(`/posts/${post.post.id}`)}
                  >
                    <img
                      className={`p-img-loading pl-img-${i} `}
                      src="https://flevix.com/wp-content/uploads/2019/07/Ball-Drop-Preloader-1-1.gif"
                    />
                    <img
                      className={`p-img p-img-${i} hidden`}
                      onLoad={() => loadIt(i)}
                      src={post.post.media_url}
                    />
                    <div className="p-hover">
                      <div className="p-likes">
                        <img
                          className="p-icons"
                          src="https://img.icons8.com/fluency-systems-filled/48/ffffff/like.png"
                        />
                        <div className="p-like-ct">{post.likes.length}</div>
                      </div>
                      <div className="p-comments">
                        <img
                          className="p-icons"
                          src="https://img.icons8.com/ios-filled/48/ffffff/speech-bubble.png"
                        />
                        <div className="p-like-ct">{post.comments.length}</div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
      {num === 8 && (
        <Modal onClose={() => setNum(0)}>
          <Unfollow user={post?.user} />
        </Modal>
      )}
    </div>
  );
};

export default Post;
