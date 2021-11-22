import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { uploadFile } from "../../store/post";
import "./EditPic.css";

const EditPic = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [file, setFile] = useState();
  const { setNum } = useModal();

  const submit = (e) => {
    setFile(e.target.files[0]);

    const fileForm = {
      file: e.target.files[0],
    };

    dispatch(uploadFile(fileForm));
    setNum(0);
  };

  return (
    <div className="edit-p-main">
      <div className="edit-p-top">
        <img className="edit-p-pic" src={user?.image_url} />
        <div className="edit-current">Current Profile Photo</div>
      </div>
      <label className="edit-option" for="files">
        Upload Photo
        <input
          id="files"
          type="file"
          className="hidden"
          onChange={(e) => submit(e)}
        />
      </label>
      <div className="edit-option2">Remove Current Photo</div>
      <div className="edit-option3" onClick={() => setNum(0)}>
        Cancel
      </div>
    </div>
  );
};

export default EditPic;
