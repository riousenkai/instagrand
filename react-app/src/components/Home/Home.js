import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findFollows } from "../../store/follow";
import { findFollowingPosts, findPosts } from "../../store/post";
import { useHistory } from "react-router";
import Picker from "emoji-picker-react";
import "./Home.css";
import OptionsModal from "../Options/OptionsModal";

const Home = () => {
  const history = useHistory();
  const emojis = useRef([]);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.session.user);
  const followingPosts = useSelector((state) => state.post.following);
  const [inputs, setInputs] = useState(
    new Array(followingPosts?.length).fill("")
  );
  const [loaded, setLoaded] = useState(
    new Array(followingPosts?.length).fill(false)
  );

  useEffect(() => {
    dispatch(findFollows(user?.id));
    dispatch(findPosts(user?.id));
  }, []);

  useEffect(() => {
    dispatch(findFollowingPosts());
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setInputs(new Array(followingPosts?.length).fill(""));
    setLoaded(new Array(followingPosts?.length).fill(false));
  }, [followingPosts]);

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
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
    // let arr = [...inputs];
    // arr[i] = arr[i] + emojiObject.emoji;
    // setInputs(arr);
  };

  return (
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
                // src="https://i.imgur.com/YNa2qdO.gif"
                src="https://flevix.com/wp-content/uploads/2019/07/Ball-Drop-Preloader-1-1.gif"
                // src="https://i.pinimg.com/originals/5b/e3/65/5be365b4576b73da8de3e8e7cf5ba94d.gif"
              />
              <img
                className={`post-img loaded-img-${i} hidden`}
                onLoad={() => loadIt(i)}
                src={post.post.media_url}
              />
              <div className="post-icons">
                <img
                  className="post-icon"
                  src="https://img.icons8.com/material-outlined/30/000000/like.png"
                />
                <img
                  className="post-icon"
                  src="https://img.icons8.com/material-outlined/24/000000/speech-bubble--v1.png"
                />
              </div>
              <div className="post-likes">15 likes</div>
              <div className="post-u-d">
                <div
                  onClick={() => history.push(`/users/${post.user.id}`)}
                  className="post-user"
                >
                  {post.user.username}
                </div>
                <div className="post-desc">{post.post.description}</div>
              </div>
              <div className="post-comment-count">{post.comments?.length > 1 ? `View all ${post.comments.length} comments` : null}</div>
              <div className="post-comments">
                {post.comments.length > 0 && post.comments.slice(0,1).map(comment => (
                  <>
                <div className="post-commenter-name">{comment.user.username}</div>
                <div className="post-comment">{comment.comment.description}</div>
                  </>
                ))}
              </div>
              <div className="post-time">{post.post.createdAt.split(' ').slice(1, 4).join(' ')}</div>
              <div className="comment-input">
                <div className="emoji-wordcount-2">
                  <div className="emoji-post2">
                    <img
                      onClick={() =>
                        emojis.current[post.post.id].classList.remove("hidden")
                      }
                      className="emoji-btn2"
                      src="https://img.icons8.com/ios/50/000000/smiling.png"
                    />
                    <div
                      className="picker hidden"
                      ref={(el) => (emojis.current[post.post.id] = el)}
                    >
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
                </div>
                <input
                  placeholder="Add a comment..."
                  className="post-comment-input"
                  value={inputs[i]}
                  onChange={(e) => update(e, i)}
                />
                <div className="post-submit-comment">Post</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-right"></div>
    </div>
  );
};

export default Home;
