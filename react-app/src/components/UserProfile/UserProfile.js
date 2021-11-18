import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { findPosts } from "../../store/post";
import { findFollows } from "../../store/follow";
import "./UserProfile.css";

const UserProfile = () => {
    const history = useHistory()
  const main = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState();
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

  return (
    <div className="prof-main">
      <div className="prof-top">
        <img className="prof-img" src={user?.image_url} />
        <div className="prof-top-right">
          <div className="prof-top-top">
            <div className="prof-name">{user?.username}</div>
            {user?.id === main?.id ? (
              <>
                <button className="prof-edit">Edit Profile</button>
              </>
            ) : null}
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
          ? posts[+userId]?.posts.map((post) => (
              <div className="post-c" onClick={() => history.push(`/posts/${post.id}`)}>
                <img className="p-img" src={post.media_url} />
                <div className="p-hover">
                  <div className="p-likes">
                    <img
                      className="p-icons"
                      src="https://img.icons8.com/fluency-systems-filled/48/ffffff/like.png"
                    />
                    <div className="p-like-ct">0</div>
                  </div>
                  <div className="p-comments">
                    <img
                      className="p-icons"
                      src="https://img.icons8.com/ios-filled/48/ffffff/speech-bubble.png"
                    />
                    <div className="p-like-ct">0</div>
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
