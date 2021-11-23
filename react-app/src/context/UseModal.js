import { createContext, useContext, useState } from "react";

const UseModalContext = createContext()

export const UseModalProvider = (props) => {
    const [num, setNum] = useState(0)
    const [postId, setPostId] = useState(0)
    const [commentId, setCommentId] = useState(0)
    const [profNum, setProfNum] = useState(0)
    const [likes, setLikes] = useState(0)
    const [unfollow, setUnfollow] = useState(0)

    return (
        <UseModalContext.Provider value={{ unfollow, setUnfollow, num, setNum, postId, setPostId, commentId, setCommentId, profNum, setProfNum, likes, setLikes }}>
          {props.children}
        </UseModalContext.Provider>
      );
}

export const useModal = () => useContext(UseModalContext)
