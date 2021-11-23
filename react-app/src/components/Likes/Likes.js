import { close } from "./LikeIcons";
import { useModal } from "../../context/UseModal";
import "./Likes.css";

const Likes = ({ users }) => {
  const { setLikes } = useModal();

  return (
    <div className="likes-main">
      {console.log(users)}
      <div className="likes-top">
        <div className="likes-header">Likes</div>
        <div className="likes-close" onClick={() => setLikes(0)}>
          {close}
        </div>
      </div>
      <div className="likes-bot">
        {users && users.map((user) => {
          <div className="likes-card-c">
            <img className="likes-img" src={user.image_url} />
            <div className="likes-details">
              <div className="likes-username">{user.username}</div>
              <div className="likes-name">{user.name}</div>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Likes;
