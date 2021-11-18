import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { postInfo } from "../../store/post";
import "./Post.css";

const Post = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => state.post?.specific[0]?.post);

  useEffect(() => {
    dispatch(postInfo(+postId));
    console.log(post)
  }, [postId]);

  return (
    <div className="post-main">
      <div className="p-card">
        <img className="pp-img" src={post?.media_url} />
        <div className="comment">{post?.id}</div>
      </div>
    </div>
  );
};

export default Post;
