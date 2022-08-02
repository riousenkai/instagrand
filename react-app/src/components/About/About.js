import { useEffect } from "react";
import { aboutIcon } from "../Likes/LikeIcons";

const About = () => {
  useEffect(() => {
    document.title = "About John Elijah 'Revan' Fajardo";
  }, []);

  return (
    <div className="prof-main">
      <div className="prof-top">
        <a
          style={{ height: "150px" }}
          href="https://www.linkedin.com/in/revanf/"
          target="_blank"
        >
          <img
            className="prof-img"
            src="https://avatars.githubusercontent.com/u/82624619?s=400&v=4"
          />
        </a>
        <div className="prof-top-right">
          <div className="prof-top-top">
            <div className="prof-name">John Elijah 'Revan' Fajardo</div>
          </div>
          <div className="prof-count">
            <div className="prof-posts">
              <span className="p-ct-bold">5</span> Posts
            </div>
            <div className="prof-posts">
              <span className="p-ct-bold">1,000,000</span> followers
            </div>
            <div className="prof-posts">
              <span className="p-ct-bold">1</span> following
            </div>
          </div>
          <div className="prof-r-name">Website Creator</div>
          <div className="prof-desc">
            <br />
            Hello! I am a Software Engineer with an affinity for React and
            Python.
            <br />
            <br />
            Please click on the images below to view my links to:
            <br />
            • GitHub
            <br />
            • LinkedIn
            <br />• Other personal projects
          </div>
        </div>
      </div>
      <div className="prof-line"></div>
      <div className="prof-posts-img">{aboutIcon} LINKS</div>
      <div className="prof-bot">
        <a
          className="post-c"
          href="https://github.com/riousenkai"
          target="_blank"
        >
          <img className="p-img" src="https://i.imgur.com/5btn6RE.png" />
          <div className="p-hover">
            <div className="p-like-ct">GitHub</div>
          </div>
        </a>
        <a
          className="post-c"
          href="https://www.linkedin.com/in/revanf/"
          target="_blank"
        >
          <img className="p-img" src="https://i.imgur.com/Z9M0KmM.jpg" />
          <div className="p-hover">
            <div className="p-like-ct">LinkedIn</div>
          </div>
        </a>
        <a
          className="post-c"
          href="http://gundam-hunt.herokuapp.com/"
          target="_blank"
        >
          <img className="p-img" src="https://i.imgur.com/4iWhnub.png" />
          <div className="p-hover">
            <div className="p-like-ct">Gundam Hunt</div>
          </div>
        </a>
        <a
          className="post-c"
          href="http://coinffflip.herokuapp.com/"
          target="_blank"
        >
          <img className="p-img" src="https://i.imgur.com/LWVvsFG.jpg" />
          <div className="p-hover">
            <div className="p-like-ct">Coin Flip</div>
          </div>
        </a>
        <a
          className="post-c"
          href="https://awesome-anime.herokuapp.com/"
          target="_blank"
        >
          <img
            className="p-img"
            src="https://camo.githubusercontent.com/f46c8ccebc56102a5f8982c0c55c6e3c80c09ba790ade0de420f3e6cffddec10/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3838373037393733363932333238373538322f3838383535393931363236333032363731382f6e65774c6f676f2e706e67"
          />
          <div className="p-hover">
            <div className="p-like-ct">awesome/Anime</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default About;
