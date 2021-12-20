import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { populateExplore } from "../../store/post";
import "./Explore.css";

const Explore = () => {
  const dispatch = useDispatch();
  const explorePosts = useSelector((state) => state.post.explore);

  useEffect(() => {
    dispatch(populateExplore());
    console.log(explorePosts);
  }, []);

  return (
    <div>
      <div>None Here Yet</div>
    </div>
  );
};

export default Explore;
