const DeleteFollower = ({ user }) => {
  return (
    <div className="delete-follower-main">
      <img className="delete-user-img" src={user.image_url} />
      <div className="del-user-title">Remove Follower?</div>
    </div>
  );
};

export default DeleteFollower;
