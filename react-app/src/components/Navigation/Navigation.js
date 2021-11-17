import { useState, useRef } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./Navigation.css";
import PostModal from "../PostModal/PostModal";

const Navigation = () => {
  const [input, useInput] = useState();
  const {num, setNum} = useModal()
  const path = window.location.pathname;
  const border = useRef(null);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const addBorder = () => {
    if (border.current.style.border === "1px solid white") {
      border.current.style.border = "1px solid black";
    } else {
      border.current.style.border = "1px solid white";
    }
  };

  return (
    <div className="nav-main">
      <img
        className="nav-img"
        onClick={() => history.push("/")}
        src="https://fontmeme.com/permalink/211116/82a5cf307c43b1eba481bf18e3124894.png"
        alt="grand-hotel-font"
        border="0"
      />
      <div classname="search-container">
        <input value={input} className="search-bar" placeholder="Search" />
        <div className="search-results hidden">
            <NavLink to={`/users/${1}`}>
                <img className="nav-prof" src={user.image_url} />
                {user.name}
            </NavLink>
        </div>
      </div>
      <div className="nav-right">
        {(path === "/" && num === 0) ? (
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
        <PostModal />
        <div className="nav-prof-border" ref={border}>
          <img className="nav-prof" onClick={addBorder} src={user.image_url} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
