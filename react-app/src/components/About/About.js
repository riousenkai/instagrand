const About = () => {
  return (
    <div className="prof-main">
      <div className="prof-top">
        <img
          className="prof-img"
          src="https://avatars.githubusercontent.com/u/82624619?s=400&v=4"
        />
        <div className="prof-top-right">
          <div className="prof-top-top">
            <div className="prof-name">Creator</div>
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
          <div className="prof-r-name">John Elijah 'Revan' Fajardo</div>
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
      <div className="prof-bot">
        <a
          className="post-c"
          href="https://github.com/riousenkai"
          target="_blank"
        >
          <img
            className="p-img"
            src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
          />
          <div className="p-hover">
            <div className="p-like-ct">GitHub</div>
          </div>
        </a>
        <a
          className="post-c"
          href="https://www.linkedin.com/in/john-elijah-revan-fajardo-33a189a3/"
          target="_blank"
        >
          <img
            className="p-img"
            src="https://www.simonzon.com/wp-content/uploads/2021/06/LinkedIn.jpg"
          />
          <div className="p-hover">
            <div className="p-like-ct">LinkedIn</div>
          </div>
        </a>
        <a
          className="post-c"
          href="http://gundam-hunt.herokuapp.com/"
          target="_blank"
        >
          <img
            className="p-img"
            src="https://gundamhangar.com/_next/static/images/gundam-icon-26-0e687f793950511687e038b7ade3b2d0.png"
          />
          <div className="p-hover">
            <div className="p-like-ct">Gundam Hunt</div>
          </div>
        </a>
        <a
          className="post-c"
          href="http://coinffflip.herokuapp.com/"
          target="_blank"
        >
          <img
            className="p-img"
            src="https://thumbs.dreamstime.com/b/image-bitcoin-black-background-bitcoin-107991145.jpg"
          />
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
