import { useModal } from "../../context/UseModal";

const Unfollow = ({ user }) => {
  const { setNum } = useModal();

  return (
    <div className="unfollow-settings">
      <div className="unfollow-img-c">
        <img className="unfollow-img" src={user.image_url} />
      </div>
      <p className="unfollow-desc">Unfollow @{user?.username}?</p>
      <div className="unfollow-p">Unfollow</div>
      <div className="unfollow-cancel" onClick={() => setNum(0)}>
        Cancel
      </div>
    </div>
  );
};

export default Unfollow;
