import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newIcon } from "./ChannelIcons";
import { findChannels } from "../../store/channel";
import "./Messages.css";
import Messages from "./Messages";
import MessageList from "./MessageList";
import { Modal } from "../../context/Modal";
import { useModal } from "../../context/UseModal";
import { io } from "socket.io-client";

let socket;


const Channels = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const channels = useSelector((state) => state.channel?.channels);
  const [msg, setMsg] = useState();
  const [chan, setChan] = useState()
  const { msgCount, setMsgCount } = useModal()
  const [liveMessages, setLiveMessages] = useState([]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setLiveMessages((liveMessages) => [...liveMessages, chat]);
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    dispatch(findChannels());
  }, []);

  const change = (user, id) => {
    setMsg(user);
    setChan(id)
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
            <div className="channel-l-icon" onClick={() => setMsgCount(1)}>{newIcon}</div>
            {msgCount === 1 && (
              <Modal onClose={() => setMsgCount(0)}>
                <MessageList />
              </Modal>
            )}
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
        <Messages user={msg} liveMessages={liveMessages} socket={socket} setLiveMessages={setLiveMessages} channelId={chan} />
      </div>
    </div>
  );
};

export default Channels;
