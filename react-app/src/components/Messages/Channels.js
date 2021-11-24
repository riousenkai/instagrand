import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newIcon } from "./ChannelIcons";
import { findChannels } from "../../store/channel";
import "./Messages.css";
import Messages from "./Messages";

const Channels = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const channels = useSelector((state) => state.channel?.channels);
  const [msg, setMsg] = useState();

  useEffect(() => {
    dispatch(findChannels());
  }, []);

  const change = (user, id) => {
    setMsg(user);
    document.querySelectorAll(".channel-card-c").forEach((c) => {
      c.classList.remove("channel-active");
    });

    document.querySelector(`.ccard-${id}`).classList.add("channel-active");
  };

  return (
    <div className="channel-main">
      <div className="channel-card">
        <div className="channel-left">
          <div className="channel-l-top">
            <div className="channel-l-name">{user?.username}</div>
            <div className="channel-l-icon">{newIcon}</div>
          </div>
          <div className="channel-l-bot">
            {channels?.length > 0 &&
              channels.map((channel) => (
                <>
                  {channel.user1_id === user?.id ? (
                    <div
                      className={`channel-card-c ccard-${channel.id}`}
                      onClick={() => change(channel.user2, channel.id)}
                    >
                      <img
                        className="channel-pic"
                        src={channel.user2.image_url}
                      />
                      <div className="channel-name">
                        {channel.user2.username}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`channel-card-c ccard-${channel.id}`}
                      onClick={() => change(channel.user1, channel.id)}
                    >
                      <img
                        className="channel-pic"
                        src={channel.user1.image_url}
                      />
                      <div className="channel-name">
                        {channel.user1.username}
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
        <Messages user={msg} />
      </div>
    </div>
  );
};

export default Channels;
