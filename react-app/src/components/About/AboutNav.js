import { useHistory } from "react-router";
import "./AboutNav.css";

const AboutNav = () => {
  const history = useHistory();

  return (
    <div className="nav-main-about">
      <img
        className="nav-img"
        onClick={() => history.push("/")}
        src="https://fontmeme.com/permalink/211117/be912bd83fb2b6a44d50d0b7b4562822.png"
        alt="grand-hotel-font"
        border="0"
      />
    </div>
  );
};

export default AboutNav;
