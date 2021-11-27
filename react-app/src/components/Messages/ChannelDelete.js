import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { deleteChannel } from "../../store/channel";
import Messages from "./Messages";
import "./Messages.css";

const ChannelDelete = ({ channelId }) => {
  const dispatch = useDispatch();
  const { setMsgCount } = useModal();
  const channels = useSelector((state) => state.channel?.channels);

  useEffect(() => {}, []);

  const del = () => {
    dispatch(deleteChannel(channelId));
    setMsgCount(0);
    return <Messages user={null} channelId={channelId} />;
  };

  return (
    <div className="del-channel-main">
      <div className="del-chan-top">
        <div className="del-chan-title">Delete Chat?</div>
        <div className="del-chan-desc">
          Deleting removes all chat messages for both users. The other user will
          be notified.
        </div>
      </div>
      <div className="del-chan-yes" onClick={del}>
        Delete
      </div>
      <div className="unfollow-cancel">Cancel</div>
    </div>
  );
};

export default ChannelDelete;
