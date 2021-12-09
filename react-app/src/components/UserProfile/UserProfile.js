import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findPosts } from "../../store/post";
import { findFollows, followUser } from "../../store/follow";
import UserModal from "./UserModal";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import EditPic from "../EditPicModal/EditPic";
import "./UserProfile.css";
import { updateUser } from "../../store/user";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";

const UserProfile = () => {
  const history = useHistory();
  const main = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { num, setNum, profNum, setLikes, likes } = useModal();
  const user = useSelector((state) => state.user.user);
  const [following, setFollowing] = useState(false);
  const posts = useSelector((state) => state.post);
  const follows = useSelector((state) => state.follow);

  useEffect(() => {
    if (user) {
      document.title = `${user?.name} (@${user?.username}) • Instagrand Photos`;
    }
  }, [user]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(updateUser(userId));
  }, [userId, profNum]);

  useEffect(() => {
    dispatch(findFollows(+userId));
    dispatch(findPosts(+userId));
  }, [userId, num]);

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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
        />
        {+userId === main?.id ? (
          <img
            className="prof-img hidden"
            onLoad={loadProfImg}
            src={user?.image_url}
            onClick={() => setNum(11)}
          />
        ) : (
          <img
            className="prof-img not-img hidden"
            onLoad={loadProfImg}
            src={user?.image_url}
          />
        )}
        <div className="prof-top-right">
          <div className="prof-top-top">
            <div className="prof-name">{user?.username}</div>
            {user?.id === main?.id ? (
              <>
                <button
                  className="prof-edit"
                  onClick={() => history.push("/settings")}
                >
                  Edit Profile
                </button>
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
            <div
              className="prof-posts prof-follows"
              onClick={() => setLikes(3)}
            >
              <span className="p-ct-bold">
                {follows[+userId]?.followers.length}
              </span>{" "}
              {follows[+userId]?.followers.length !== 1
                ? "followers"
                : "follower"}
            </div>
            {likes === 3 && (
              <Modal onClose={() => setLikes(0)}>
                <FollowerModal
                  followers={follows[+userId]?.followers}
                  userId={userId}
                />
              </Modal>
            )}
            <div
              className="prof-posts prof-follows"
              onClick={() => setLikes(5)}
            >
              <span className="p-ct-bold">
                {follows[+userId]?.following.length}
              </span>{" "}
              following
            </div>
            {likes === 5 && (
              <Modal onClose={() => setLikes(0)}>
                <FollowingModal followingPeople={follows[+userId]?.following} />
              </Modal>
            )}
          </div>
          <div className="prof-r-name">{user?.name}</div>
          <div className="prof-desc">
            {user?.description !== null &&
              user?.description.split("\n").map((sentence) => (
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
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
      {num === 11 && (
        <Modal onClose={() => setNum(0)}>
          <EditPic />
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
