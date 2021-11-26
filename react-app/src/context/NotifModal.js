import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const NotifModalContext = React.createContext();

export function NewModalProvider({ children }) {
  const newModalRef = useRef();
  const [openNotif, setOpenNotif] = useState();

  useEffect(() => {
    setValue(notifModalRef.current);
  }, []);

  return (
    <>
      <NotifModalContext.Provider value={value}>
        {children}
      </NotifModalContext.Provider>
      <div ref={notifModalRef} />
    </>
  );
}

export function NotifModal({ onClose, children }) {
  const notifModalNode = useContext(NotifModalContext);
  if (!notifModalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal3">
      <div id="modal-background3" onClick={onClose} />
      <div id="modal-content3">{children}</div>
    </div>,
    notifModalNode
  );
}
