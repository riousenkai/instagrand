import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { closeIcon } from "./ChannelIcons";
import { getMsgList } from "../../store/message";
import { createChannels } from "../../store/channel";
import "./Messages.css";

const ChannelDelete = () => {
  const dispatch = useDispatch();
  const { setMsgCount, setAcct, setPick, active } = useModal();
  const list = useSelector((state) => state.message.list);
  const [people, setPeople] = useState([]);
  const [input, setInput] = useState("");
  const channels = useSelector((state) => state.channel?.channels);
  const [chosen, setChosen] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getMsgList());
    document.querySelector(".msg-input-search")?.focus();
  }, []);

  useEffect(() => {
    setPeople(list);
  }, [list]);

  useEffect(() => {
    const filtered = list?.filter((c) => {
      if (
        c.name.toLowerCase().startsWith(input.toLowerCase()) ||
        c.username.startsWith(input.toLowerCase())
      ) {
        return c;
      }
    });
    setPeople(filtered);
  }, [input]);

  const newChannel = () => {
    if (chosen === null) {
      return;
    }

    dispatch(createChannels(chosen)).then(() => {
      let item = channels.find(
        (c) => c.user1_id === chosen || c.user2_id === chosen
      );
      if (item) {
        if (active === item.id) {
          return;
        }
        setAcct(item.id);
        setPick(user);
        document.querySelector(`.ccard-${item.id}`)?.click();
      } else {
        setAcct(null);
        setPick(user);
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
      <div className="msg-input-main">
        <div className="msg-input-to">To:</div>
        <input
          className="msg-input-search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        ></input>
      </div>
      <div className="msg-list">
        {people?.length > 0 ? (
          people?.map((li, i) => (
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
              ></button>
              <button
                className={`list-not-selected2 selected-list-${li.id} hidden`}
                onClick={(e) => deselect(e)}
              ></button>
            </div>
          ))
        ) : (
          <div className="list-c-error">
            Please follow other users or obtain followers to message other
            users.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDelete;
