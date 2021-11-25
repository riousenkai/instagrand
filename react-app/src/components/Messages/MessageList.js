import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Messages.css";
import { closeIcon, selectedIcon, notSelectedIcon } from "./ChannelIcons";
import { getMsgList } from "../../store/message";
import { createChannels, findChannels } from "../../store/channel";

const MessageList = () => {
  const dispatch = useDispatch();
  const { setMsgCount, setAcct, setPick } = useModal();
  const list = useSelector((state) => state.message.list);
  const channels = useSelector((state) => state.channel?.channels);
  const [chosen, setChosen] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getMsgList());
  }, []);

  // useEffect(() => {
  //   let item = channels.find(
  //     (c) => c.user1_id === chosen || c.user2_id === chosen
  //   );
  //   if (item) {
  //     setPick(user);
  //     setAcct(item.id);
  //     document.querySelector(`.ccard-${item.id}`).click();
  //   }
  // }, [channels]);

  const newChannel = () => {
    if (chosen === null) {
      return;
    }

    dispatch(createChannels(chosen)).then(() => {
      let item = channels.find(
        (c) => c.user1_id === chosen || c.user2_id === chosen
      );
      if (item) {
        setAcct(item.id);
        setPick(user);
        document.querySelector(`.ccard-${item.id}`)?.click();
      } else {
        setAcct(null)
        setPick(user)
      }
    });

    setMsgCount(0);
  };

  const deselect = (e) => {
    e.stopPropagation();

    document.querySelectorAll(".list-not-selected2")?.forEach((li) => {
      li.classList.add("hidden");
    });

    document.querySelectorAll(".list-not-selected")?.forEach((li) => {
      li.classList.remove("hidden");
    });

    setChosen(null);
  };

  const select = (e, id, li) => {
    e.stopPropagation();

    if (
      document.querySelector(`.not-list-${id}`)?.classList.contains("hidden")
    ) {
      return deselect(e);
    }

    deselect(e);

    document.querySelector(`.not-list-${id}`)?.classList.add("hidden");

    document.querySelector(`.selected-list-${id}`)?.classList.remove("hidden");

    setChosen(id);
    setUser(li);
  };

  return (
    <div className="list-main">
      <div className="msg-list-top">
        <div className="close-msg-list" onClick={() => setMsgCount(0)}>
          {closeIcon}
        </div>
        <div className="msg-list-title">New Message</div>
        <button
          className="msg-list-next"
          disabled={chosen === null}
          onClick={newChannel}
        >
          Next
        </button>
      </div>
      <div className="msg-list">
        {list?.length > 0
          ? list.map((li, i) => (
              <div
                className="list-card"
                key={i}
                onClick={(e) => select(e, li.id, li)}
              >
                <img className="list-c-img" src={li.image_url} />
                <div className="list-card-desc">
                  <div className="list-card-username">{li.username}</div>
                  <div className="list-card-name">{li.name}</div>
                </div>
                <button
                  className={`list-not-selected not-list-${li.id}`}
                  onClick={(e) => select(e, li.id, li)}
                >
                  {notSelectedIcon}
                </button>
                <button
                  className={`list-not-selected2 selected-list-${li.id} hidden`}
                  onClick={(e) => deselect(e)}
                >
                  {selectedIcon}
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MessageList;
