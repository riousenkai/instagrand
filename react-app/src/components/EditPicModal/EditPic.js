import { useSelector } from "react-redux";
import { useModal } from "../../context/UseModal";
import "./EditPic.css";

const EditPic = () => {
  const user = useSelector((state) => state.session.user);
  const { setNum } = useModal();

  return (
    <div className="edit-p-main">
      <div className="edit-p-top">
        <img className="edit-p-pic" src={user?.image_url} />
        <div className="edit-current">Current Profile Photo</div>
      </div>
      <div className="edit-option">Upload Photo</div>
      <div className="edit-option2">Remove Current Photo</div>
      <div className="edit-option3" onClick={() => setNum(0)}>
        Cancel
      </div>
    </div>
  );
};

export default EditPic;
