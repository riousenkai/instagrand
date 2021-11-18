import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findFollows } from "../../store/follow";
import { postInfo } from "../../store/post";
import "./Post.css";

const Post = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => state.post?.specific);
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follow[user?.id]?.following);

  useEffect(() => {
    dispatch(postInfo(+postId));
    dispatch(findFollows(user?.id));
  }, [postId, user]);

  return (
    <div className="post-main">
      <div className="p-card">
        <img className="pp-img" src={post?.post?.media_url} />
        <div className="pp-right">
          <div className="pp-top-right">
            <img
              className="pp-user-img"
              src={post?.user?.image_url}
              onClick={() => history.push(`/users/${post?.user?.id}`)}
            />
            <div
              className="pp-user"
              onClick={() => history.push(`/users/${post?.user?.id}`)}
            >
              {post?.user?.username}
            </div>
            {following?.find((f) => f.id === user.id) !== undefined ? (
              <div className="pp-follow">• Following</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
