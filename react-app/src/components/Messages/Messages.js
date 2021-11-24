import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMessages } from "../../store/message";

const Messages = ({ user, channelId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    if (user) {
      dispatch(getChannelMessages(channelId));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="no-channel">
        <img className="no-channel-img" src="https://i.imgur.com/XPOUlZK.png" />
        <div className="no-msgs">Your Messages</div>
        <div className="no-msgs-desc">Send private messages to a friend.</div>
        <button className="no-channel-button">Send Message</button>
      </div>
    );
  } else {
    return (
      <div className="channel-right">
        <div className="channel-r-top">
          <img className="channel-rt-img" src={user?.image_url} />
          <NavLink to={`/users/${user?.id}`} className="channel-rt-name">
            {user?.username}
          </NavLink>
        </div>
        <div className="channel-msgs">
            <div className="channel-msgs-card"></div>
        </div>
      </div>
    );
  }
};

export default Messages;
