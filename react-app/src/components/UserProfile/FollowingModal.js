import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/UseModal";
import { close } from "../Likes/LikeIcons";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router";
import Unfollow from "./Unfollow";
import { followUser, findFollows } from "../../store/follow";

const FollowingModal = ({ followingPeople }) => {
  const history = useHistory();
  const { setLikes, setUnfollow2, unfollow2 } = useModal();
  const [unfollowed, setUnfollowed] = useState();
  const dispatch = useDispatch();
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
        <div className="likes-header">Following</div>
        <div className="likes-close" onClick={() => setLikes(0)}>
          {close}
        </div>
      </div>
      <div className="likes-bot">
        {followingPeople?.length > 0 &&
          followingPeople?.map((user) => (
            <div className="likes-card">
              <img
                className="likes-img"
                src={user?.image_url}
                onClick={() => {
                  setLikes(0);
                  history.push(`/users/${user.id}`);
                }}
              />
              <div className="likes-details">
                <div
                  className="likes-username"
                  onClick={() => {
                    setLikes(0);
                    history.push(`/users/${user.id}`);
                  }}
                >
                  {user.username}
                </div>
                <div className="likes-name">{user.name}</div>
              </div>
              {user.id !== main.id ? (
                following?.find((f) => f.id === user.id) === undefined ? (
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
                        setUnfollowed(user);
                        setUnfollow2(user.id);
                      }}
                    >
                      Following
                    </button>
                    {unfollow2 === user.id && (
                      <Modal onClose={() => setUnfollow2(0)}>
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

export default FollowingModal;
