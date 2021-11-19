import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findPosts } from "../../store/post";
import { findFollows, followUser } from "../../store/follow";
import "./UserProfile.css";
import UserModal from "./UserModal";

const UserProfile = () => {
  const history = useHistory();
  const main = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [following, setFollowing] = useState(false);
  const posts = useSelector((state) => state.post);
  const follows = useSelector((state) => state.follow);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(findFollows(+userId));
    dispatch(findPosts(+userId));
  }, [userId]);

  const loadIt = (i) => {
    document.querySelector(`.pl-img-${i}`).classList.add("hidden");
    document.querySelector(`.p-img-${i}`).classList.remove("hidden");
  };

  const loadProfImg = () => {
    document.querySelector(`.prof-img-loading`).classList.add("hidden");
    document.querySelector(`.prof-img`).classList.remove("hidden");
  };

  useEffect(() => {
    const followers = follows[+userId]?.followers;
    const result = followers?.find((f) => f.id === main?.id);
    if (result) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [userId, user, follows]);

  const follow = () => {
    dispatch(followUser(userId));
  };

  return (
    <div className="prof-main">
      <div className="prof-top">
        <img
          className="prof-img-loading"
          src="https://flevix.com/wp-content/uploads/2019/07/Ball-Drop-Preloader-1-1.gif"
        />
        <img
          className="prof-img hidden"
          onLoad={loadProfImg}
          src={user?.image_url}
        />
        <div className="prof-top-right">
          <div className="prof-top-top">
            <div className="prof-name">{user?.username}</div>
            {user?.id === main?.id ? (
              <>
                <button className="prof-edit">Edit Profile</button>
              </>
            ) : following === true ? (
              <UserModal user={user}></UserModal>
            ) : (
              <button className="prof-follow" onClick={follow}>
                Follow
              </button>
            )}
          </div>
          <div className="prof-count">
            <div className="prof-posts">
              <span className="p-ct-bold">{posts[+userId]?.posts.length}</span>{" "}
              {posts[+userId]?.posts.length !== 1 ? "posts" : "post"}
            </div>
            <div className="prof-posts">
              <span className="p-ct-bold">
                {follows[+userId]?.followers.length}
              </span>{" "}
              {follows[+userId]?.followers.length !== 1
                ? "followers"
                : "follower"}
            </div>
            <div className="prof-posts">
              <span className="p-ct-bold">
                {follows[+userId]?.following.length}
              </span>{" "}
              following
            </div>
          </div>
          <div className="prof-desc">
            {user?.description.split("\n").map((sentence) => (
              <>
                {sentence}
                <br />
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="prof-bot">
        {posts[+userId]?.posts.length > 0
          ? posts[+userId]?.posts.map((post, i) => (
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
  );
};

export default UserProfile;
