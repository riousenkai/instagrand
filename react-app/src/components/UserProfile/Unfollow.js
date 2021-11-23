import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/UseModal";
import { unFollowUser, findFollows } from "../../store/follow";
import { findFollowingPosts } from "../../store/post";

const Unfollow = ({ user }) => {
  const dispatch = useDispatch();
  const { setNum, setPostId } = useModal();
  const main = useSelector((state) => state.session.user);

  const remove = () => {
    dispatch(unFollowUser(user?.id))
      .then(() => dispatch(findFollowingPosts(main?.id)))
      .then(() => dispatch(findFollows(main?.id)));
    setNum(0);
    setPostId(0);
  };

  return (
    <div className="unfollow-settings">
      <div className="unfollow-img-c">
        <img className="unfollow-img" src={user.image_url} />
      </div>
      <p className="unfollow-desc">Unfollow @{user?.username}?</p>
      <div className="unfollow-p" onClick={remove}>
        Unfollow
      </div>
      <div
        className="unfollow-cancel"
        onClick={() => {
          setPostId(0);
          setNum(0);
        }}
      >
        Cancel
      </div>
    </div>
  );
};

export default Unfollow;
