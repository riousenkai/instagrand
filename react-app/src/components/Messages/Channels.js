import { useSelector } from "react-redux";
import { newIcon } from "./ChannelIcons";
import "./Messages.css";

const Channels = () => {
  const user = useSelector((state) => state.session.user);
  const channels = useSelector(state => state.channels)

  return (
    <div className="channel-main">
      <div className="channel-card">
        <div className="channel-left">
          <div className="channel-l-top">
            <div className="channel-l-name">{user?.username}</div>
            <div className="channel-l-icon">{newIcon}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
