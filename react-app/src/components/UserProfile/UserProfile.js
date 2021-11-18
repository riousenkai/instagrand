import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { findPosts } from "../../store/post";
import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState()

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
    dispatch(findPosts(+userId));
  }, [userId]);

  return (
    <div className="prof-main">
      <div className="prof-top">
          <img className="prof-img" src={user?.image_url} />
          <div className="prof-top-top">

          </div>
      </div>
    </div>
  );
};

export default UserProfile;
