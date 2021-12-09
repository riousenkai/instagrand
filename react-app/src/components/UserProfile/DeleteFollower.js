import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { removeFollower, findFollows } from "../../store/follow";

const DeleteFollower = ({ user, setUnfollow2, setLikes, mainId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const delUser = () => {
    dispatch(removeFollower(user.id, mainId)).then(() =>
      dispatch(findFollows(mainId))
    );
    setUnfollow2(0);
  };

  return (
    <div className="delete-follower-main">
      <img
        className="delete-user-img"
        src={user?.image_url}
        onClick={() => {
          setUnfollow2(0);
          setLikes(0);
          history.push(`/users/${user.id}`);
        }}
      />
      <div className="del-user-title">Remove Follower?</div>
      <div className="del-user-desc">
        Instagrand won't tell {user.username} they were removed from your
        followers
      </div>
      <div className="del-user-conf" onClick={delUser}>
        Remove
      </div>
      <div className="del-user-cancel" onClick={() => setUnfollow2(0)}>
        Cancel
      </div>
    </div>
  );
};

export default DeleteFollower;
