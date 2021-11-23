import { close } from "./LikeIcons";

const Likes = ({ users }) => {
  return (
    <div className="likes-main">
      <div className="likes-top">
        <div className="likes-header">Likes</div>
        <div className="likes-close">{close}</div>
      </div>
      <div className="likes-bot">

      </div>
    </div>
  );
};

export default Likes;
