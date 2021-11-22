import { createContext, useContext, useState } from "react";

const UseModalContext = createContext()

export const UseModalProvider = (props) => {
    const [num, setNum] = useState(0)
    const [postId, setPostId] = useState(0)
    const [commentId, setCommentId] = useState(0)
    const [profNum, setProfNum] = useState(0)

    return (
        <UseModalContext.Provider value={{ num, setNum, postId, setPostId, commentId, setCommentId, profNum, setProfNum }}>
          {props.children}
        </UseModalContext.Provider>
      );
}

export const useModal = () => useContext(UseModalContext)
