import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Messages.css";
import { closeIcon } from "./ChannelIcons";
import { getMsgList } from "../../store/message";

const MessageList = () => {
  const dispatch = useDispatch();
  const { setMsgCount } = useModal();
  const list = useSelector((state) => state.message.list);

  useEffect(() => {
    dispatch(getMsgList());
  }, []);

  return (
    <div className="list-main">
      <div className="msg-list-top">
        <div className="close-msg-list" onClick={() => setMsgCount(0)}>
          {closeIcon}
        </div>
        <div className="msg-list-title">New Message</div>
        <div className="msg-list-next">Next</div>
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
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MessageList;
