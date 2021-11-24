import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Messages.css";
import { closeIcon } from "./ChannelIcons";
import { getMsgList } from "../../store/message";

const MessageList = () => {
  const dispatch = useDispatch()
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
        
      </div>
    </div>
  );
};

export default MessageList;
