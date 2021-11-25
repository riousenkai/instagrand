import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getChannelMessages } from "../../store/message";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";
let socket;

const Messages = ({ user, channelId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const emoji = useRef(null);
  const [prevRoom, setPrevRoom] = useState(channelId);
  const [liveMessages, setLiveMessages] = useState([]);
  const main = useSelector((state) => state.session.user);

  useEffect(() => {
    socket = io();
    socket.on("message", (chat) => {
      setLiveMessages((liveMessages) => [...liveMessages, chat]);
      let body = document.querySelector(".channel-msgs");
      body.scrollTop = body.scrollHeight - body.clientHeight;
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    leaveRoom(prevRoom);
    joinRoom(channelId);
    setLiveMessages([]);
    console.log(prevRoom, channelId);
    setPrevRoom(channelId);
  }, [channelId]);

  const leaveRoom = (oldRoom) => {
    socket.emit("leave", { room: oldRoom });
  };

  const joinRoom = (newRoom) => {
    socket.emit("join", { room: newRoom });
  };

  useEffect(() => {
    if (user) {
      dispatch(getChannelMessages(channelId)).then(() => {
        let body = document.querySelector(".channel-msgs");
        body.scrollTop = body.scrollHeight - body.clientHeight;
      });
    }
    setInput("");
  }, [user]);

  const showEmoji = () => {
    if (count === 0) {
      emoji.current.classList.remove("hidden");
      setCount(1);
    } else {
      setCount(0);
    }
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        if (
          !e?.target?.classList?.contains("emoji-btn4") &&
          !e?.target?.nextElementSibling?.classList.contains("hidden")
        ) {
          setCount(0);
        }
        if (ref.current && !ref.current.contains(e.target)) {
          emoji.current.classList.add("hidden");
        }
      };
      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref]);
  };

  RemoveOutside(emoji);

  const onEmojiClick = (event, emojiObject) => {
    let copy = input;
    copy += emojiObject.emoji;
    setInput(copy);
  };

  const send = (e) => {
    e.preventDefault();

    if (input.length < 1) {
      return;
    }

    socket.send({
      sender_id: main?.id,
      receiver_id: user?.id,
      message: input,
      dm_id: channelId,
      room: channelId,
    });

    const obj = {
      receiver_id: user?.id,
      message: input,
      dm_id: channelId,
    };

    setInput("");

    dispatch(createMessage(obj));

    return;
  };

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
          <div className="channel-msgs-inner">
            {messages?.length > 0 &&
              messages?.map((msg) => (
                <>
                  {msg.sender_id === user?.id ? (
                    <div className="channel-msgs-rec">
                      <img className="msg-left-img" src={user?.image_url} />
                      <div className="msg-content">
                        {msg.message.split("\n").map((sentence) => (
                          <>
                            {sentence}
                            <br />
                          </>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="channel-msgs-rec-right">
                      <div className="msg-content-right">
                        {msg.message.split("\n").map((sentence) => (
                          <>
                            {sentence}
                            <br />
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ))}
            {liveMessages.map((msg) => (
              <>
                {msg.sender_id === user?.id ? (
                  <div className="channel-msgs-rec">
                    <img className="msg-left-img" src={user?.image_url} />
                    <div className="msg-content">
                      {msg.message.split("\n").map((sentence) => (
                        <>
                          {sentence}
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="channel-msgs-rec-right">
                    <div className="msg-content-right">
                      {msg.message.split("\n").map((sentence) => (
                        <>
                          {sentence}
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="msg-input">
          <div className="msg-box">
            <div className="emoji-post2">
              <img
                onClick={() => showEmoji()}
                className="emoji-btn4"
                src="https://img.icons8.com/ios/50/000000/smiling.png"
              />
              <div className="picker hidden" ref={emoji}>
                <Picker
                  native={true}
                  onEmojiClick={onEmojiClick}
                  pickerStyle={{
                    position: "absolute",
                    width: "15vw",
                    marginLeft: "-12px",
                    top: "-330px",
                  }}
                />
              </div>
            </div>
            <textarea
              className="msgs-textarea"
              placeholder="Message..."
              value={input}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(e)}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              disabled={input.length < 1}
              className="msg-post"
              onClick={(e) => send(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Messages;
