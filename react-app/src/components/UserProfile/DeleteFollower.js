import { useHistory } from "react-router";

const DeleteFollower = ({ user, setUnfollow2, setLikes }) => {
  const history = useHistory();

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
      <div className="del-user-conf">Remove</div>
      <div className="del-user-cancel" onClick={() => setUnfollow2(0)}>
        Cancel
      </div>
    </div>
  );
};

export default DeleteFollower;
