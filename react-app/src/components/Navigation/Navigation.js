import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Navigation.css";
import { searchUsers } from "../../store/search.js";
import PostModal from "../PostModal/PostModal";
import NavModal from "../NavModal/NavModal";
import { msgIcon, msgIconActive, notifIcon, notifIconFocus } from "./NavIcons";

const Navigation = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { num, setPick, setAcct, setNum } = useModal();
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
            <img
              onClick={() => history.push("/")}
              className="nav-icons"
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTSAxMiAyLjA5OTYwOTQgTCAxIDEyIEwgNCAxMiBMIDQgMjEgTCAxMCAyMSBMIDEwIDE0IEwgMTQgMTQgTCAxNCAyMSBMIDIwIDIxIEwgMjAgMTIgTCAyMyAxMiBMIDEyIDIuMDk5NjA5NCB6Ij48L3BhdGg+PC9zdmc+"
            />
          ) : (
            <img
              onClick={() => history.push("/")}
              className="nav-icons"
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzIiIGhlaWdodD0iMzIiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTg2LDEzLjk0MTQxbC0zLjg2MzI4LDMuNjk1MzFsLTY5Ljg3NSw2OS44NzVsNy43MjY1Niw3LjcyNjU2bDYuODg2NzIsLTYuODg2NzJ2NjIuMTQ4NDRoNDguMzc1di01My43NWgyMS41djUzLjc1aDQ4LjM3NXYtNjIuMTQ4NDRsNi44ODY3Miw2Ljg4NjcybDcuNzI2NTYsLTcuNzI2NTZsLTY5Ljg3NSwtNjkuODc1ek04NiwyOS4yMjY1Nmw0OC4zNzUsNDguMzc1djYyLjE0ODQ0aC0yNi44NzV2LTUzLjc1aC00M3Y1My43NWgtMjYuODc1di02Mi4xNDg0NHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            />
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
          {num === 55 ? (
            <span className="notif-icon" onClick={() => setNum(0)}>{notifIconFocus}</span>
          ) : (
            <span className="notif-icon" onClick={() => setNum(55)}>{notifIcon}</span>
          )}
          <NavModal user={user} path={path} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
