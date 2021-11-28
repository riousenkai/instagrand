import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Navigation.css";
import { searchUsers } from "../../store/search.js";
import PostModal from "../PostModal/PostModal";
import NavModal from "../NavModal/NavModal";
import { msgIcon, msgIconActive, homeActive, homeIcon } from "./NavIcons";
import NotificationsModal from "../Notifications/NotificationsModal";

const Navigation = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { num, setPick, setAcct, setCurrUser } = useModal();
  const path = window.location.pathname;
  const user = useSelector((state) => state.session?.user);
  const history = useHistory();
  const results = useSelector((state) => state.search?.users);

  useEffect(() => {
    if (input?.length > 0) {
      dispatch(searchUsers(input));
    }
  }, [input]);

  useEffect(() => {
    setPick(null);
    setAcct(null);
    setCurrUser(null);
  }, [path]);

  const show = () => {
    document.querySelector(".search-results").classList.remove("hidden");
  };

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      document.querySelector(".search-results").classList.add("hidden");
    }
  };

  const reset = () => {
    document.querySelector(".search-results").classList.add("hidden");
    setInput("");
  };

  return (
    <div className="nav-main">
      <div className="nav-mid">
        <img
          className="nav-img"
          onClick={() => history.push("/")}
          src="https://fontmeme.com/permalink/211117/be912bd83fb2b6a44d50d0b7b4562822.png"
          alt="grand-hotel-font"
          border="0"
        />
        <div className="search-container" onBlur={(e) => hide(e)}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => show()}
            className="search-bar"
            placeholder="Search"
          />
          <div className="search-results hidden">
            {results?.length > 0 && input.length > 0 ? (
              results.map((res) => (
                <NavLink
                  className="search-card"
                  onClick={reset}
                  to={`/users/${res.id}`}
                >
                  <img className="search-prof" src={res.image_url} />
                  <div className="search-names">
                    <div className="search-username">{res.username}</div>
                    <div className="search-name">{res.name}</div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="search-none">No results.</div>
            )}
          </div>
        </div>
        <div className="nav-right">
          {path === "/" && num === 0 ? (
            <div onClick={() => history.push("/")} className="nav-icons">
              {homeActive}
            </div>
          ) : (
            <div onClick={() => history.push("/")} className="nav-icons">
              {homeIcon}
            </div>
          )}
          {path === "/messages" && num === 0 ? (
            <span
              className="nav-msg-icon"
              onClick={() => history.push("/messages")}
            >
              {msgIconActive}
            </span>
          ) : (
            <span
              className="nav-msg-icon"
              onClick={() => history.push("/messages")}
            >
              {msgIcon}
            </span>
          )}
          <PostModal />
          <NotificationsModal />
          <NavModal user={user} path={path} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
