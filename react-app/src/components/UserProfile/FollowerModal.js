import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/UseModal";
import { close } from "../Likes/LikeIcons";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router";
import Unfollow from "./Unfollow";
import { followUser, findFollows } from "../../store/follow";
import DeleteFollower from "./DeleteFollower";

const FollowerModal = ({ followers, userId }) => {
  const history = useHistory();
  const { setLikes, setUnfollow2, unfollow2 } = useModal();
  const [unfollowed, setUnfollowed] = useState();
  const dispatch = useDispatch();
  const main = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follow[main?.id]?.following);

  const follow = (id) => {
    dispatch(followUser(id)).then(() => dispatch(findFollows(main?.id)));
  };

  return (
    <div className="likes-main">
      <div className="likes-top">
        <div className="likes-header">Followers</div>
        <div className="likes-close" onClick={() => setLikes(0)}>
          {close}
        </div>
      </div>
      <div className="likes-bot">
        {followers?.length > 0 &&
          followers?.map((user) => (
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
              {main.id === +userId ? (
                <>
                  <button
                    className="likes-unfollow"
                    onClick={() => {
                      setUnfollowed(user);
                      setUnfollow2(user.id);
                    }}
                  >
                    Remove
                  </button>
                  {unfollow2 === user.id && (
                    <Modal onClose={() => setUnfollow2(0)}>
                      <DeleteFollower user={unfollowed} />
                    </Modal>
                  )}
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowerModal;
