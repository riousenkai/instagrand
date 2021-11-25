import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Messages.css";
import { closeIcon, selectedIcon, notSelectedIcon } from "./ChannelIcons";
import { getMsgList } from "../../store/message";

const MessageList = () => {
  const dispatch = useDispatch();
  const { setMsgCount } = useModal();
  const list = useSelector((state) => state.message.list);
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    dispatch(getMsgList());
  }, []);

  const deselect = () => {
    document.querySelectorAll(".list-not-selected2").forEach((li) => {
      li.classList.add("hidden");
    });

    document.querySelectorAll(".list-not-selected").forEach((li) => {
      li.classList.remove("hidden");
    });

    setChosen(null);
  };

  const select = (id) => {
    deselect();

    document.querySelector(`.not-list-${id}`).classList.add("hidden");

    document.querySelector(`.selected-list-${id}`).classList.remove("hidden");

    setChosen(id);
  };

  return (
    <div className="list-main">
      <div className="msg-list-top">
        <div className="close-msg-list" onClick={() => setMsgCount(0)}>
          {closeIcon}
        </div>
        <div className="msg-list-title">New Message</div>
        <button className="msg-list-next" disabled={chosen === null}>
          Next
        </button>
      </div>
      <div className="msg-list">
        {list?.length > 0
          ? list.map((li, i) => (
              <div className="list-card" key={i}>
                <img className="list-c-img" src={li.image_url} />
                <div className="list-card-desc">
                  <div className="list-card-username">{li.username}</div>
                  <div className="list-card-name">{li.name}</div>
                </div>
                <button
                  className={`list-not-selected not-list-${li.id}`}
                  onClick={() => select(li.id)}
                >
                  {notSelectedIcon}
                </button>
                <button
                  className={`list-not-selected2 selected-list-${li.id} hidden`}
                  onClick={deselect}
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
