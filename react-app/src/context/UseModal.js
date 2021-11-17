import { createContext, useContext, useState } from "react";

const UseModalContext = createContext()

export const UseModalProvider = (props) => {
    const [num, setNum] = useState(0)
    const [postId, setPostId] = useState(0)

    return (
        <UseModalContext.Provider value={{ num, setNum, postId, setPostId }}>
          {props.children}
        </UseModalContext.Provider>
      );
}

export const useModal = () => useContext(UseModalContext)
