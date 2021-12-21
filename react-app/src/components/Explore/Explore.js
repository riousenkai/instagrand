import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { populateExplore } from "../../store/post";
import "./Explore.css";

const Explore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const explorePosts = useSelector((state) => state.post.explore);

  useEffect(() => {
    dispatch(populateExplore());
  }, []);

  const loadIt = (i) => {
    document.querySelector(`.pl-img-${i}`).classList.add("hidden");
    document.querySelector(`.p-img-${i}`).classList.remove("hidden");
  };

  return (
    <div className="explore-main">
      <div className="explore-card">
        {explorePosts?.length > 0 ? (
          explorePosts?.map((post, i) => (
            <div
              className="post-c"
              onClick={() => history.push(`/posts/${post.post.id}`)}
            >
              <img
                className={`p-img-loading pl-img-${i} `}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
              />
              <img
                className={`p-img p-img-${i} hidden`}
                onLoad={() => loadIt(i)}
                src={post.post.media_url}
              />
              <div className="p-hover">
                <div className="p-likes">
                  <img
                    className="p-icons"
                    src="https://img.icons8.com/fluency-systems-filled/48/ffffff/like.png"
                  />
                  <div className="p-like-ct">{post.likes}</div>
                </div>
                <div className="p-comments">
                  <img
                    className="p-icons"
                    src="https://img.icons8.com/ios-filled/48/ffffff/speech-bubble.png"
                  />
                  <div className="p-like-ct">{post.comments}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="explore-none">No Available Posts</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
