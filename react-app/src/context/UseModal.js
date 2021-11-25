import { createContext, useContext, useState } from "react";

const UseModalContext = createContext();

export const UseModalProvider = (props) => {
  const [num, setNum] = useState(0);
  const [postId, setPostId] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [profNum, setProfNum] = useState(0);
  const [likes, setLikes] = useState(0);
  const [unfollow, setUnfollow] = useState(0);
  const [unfollow2, setUnfollow2] = useState(0);
  const [msgCount, setMsgCount] = useState(0);
  const [acct, setAcct] = useState(0);
  const [pick, setPick] = useState(null);

  return (
    <UseModalContext.Provider
      value={{
        unfollow,
        setUnfollow,
        unfollow2,
        setUnfollow2,
        num,
        setNum,
        postId,
        setPostId,
        commentId,
        setCommentId,
        profNum,
        setProfNum,
        likes,
        setLikes,
        msgCount,
        setMsgCount,
        acct,
        setAcct,
        pick,
        setPick,
      }}
    >
      {props.children}
    </UseModalContext.Provider>
  );
};

export const useModal = () => useContext(UseModalContext);
