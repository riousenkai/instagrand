import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { close } from "./LikeIcons";
import { useModal } from "../../context/UseModal";
import { Modal } from "../../context/Modal";
import Unfollow from "../UserProfile/Unfollow";
import "./Likes.css";
import { findFollows, followUser } from "../../store/follow";

const Likes = ({ users }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setLikes, unfollow, setUnfollow } = useModal();
  const [unfollowed, setUnfollowed] = useState()
  const main = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follow[main?.id]?.following);

  useEffect(() => {
    dispatch(findFollows(main?.id));
  }, [main]);

  const follow = (id) => {
    dispatch(followUser(id)).then(() => dispatch(findFollows(main?.id)));
  };

  return (
    <div className="likes-main">
      <div className="likes-top">
        <div className="likes-header">Likes</div>
        <div className="likes-close" onClick={() => setLikes(0)}>
          {close}
        </div>
      </div>
      <div className="likes-bot">
        {users?.length > 0 &&
          users?.map((user) => (
            <div className="likes-card">
              <img
                className="likes-img"
                src={user?.image_url}
                onClick={() => history.push(`/users/${user.id}`)}
              />
              <div className="likes-details">
                <div
                  className="likes-username"
                  onClick={() => history.push(`/users/${user.id}`)}
                >
                  {user.username}
                </div>
                <div className="likes-name">{user.name}</div>
              </div>
              {user.id !== main.id ? (
                following.find((f) => f.id === user.id) === undefined ? (
                  <>
                    <button
                      className="likes-follow"
                      onClick={() => follow(user.id)}
                    >
                      Follow
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="likes-unfollow"
                      onClick={() => {
                          setUnfollowed(user)
                          setUnfollow(user.id)}}
                    >
                      Following
                    </button>
                    {unfollow === user.id && (
                      <Modal onClose={() => setUnfollow(0)}>
                        <Unfollow user={unfollowed} />
                      </Modal>
                    )}
                  </>
                )
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Likes;
