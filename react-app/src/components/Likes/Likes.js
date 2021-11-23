import { close } from "./LikeIcons";

const Likes = ({ users }) => {
  return (
    <div className="likes-main">
      <div className="likes-top">
        <div className="likes-header">Likes</div>
        {close}
      </div>
    </div>
  );
};

export default Likes;
