import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { findPosts } from "../../store/post";
import { findFollows } from "../../store/follow";
import "./UserProfile.css";

const UserProfile = () => {
  const main = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const posts = useSelector(state => state.post)
  const follows = useSelector(state => state.follow)

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
              <div className="prof-posts"><span className="p-ct-bold">{posts[+userId]?.posts.length}</span> {posts[+userId]?.posts.length !== 1 ? "posts" : "post"}</div>
              <div className="prof-posts"><span className="p-ct-bold">{follows[+userId]?.followers.length}</span> {follows[+userId]?.followers.length !== 1 ? "followers" : "follower"}</div>
              <div className="prof-posts"><span className="p-ct-bold">{follows[+userId]?.following.length}</span> following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
