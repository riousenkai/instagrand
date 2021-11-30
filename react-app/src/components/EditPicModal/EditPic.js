import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/UseModal";
import { deletePic, updateUser, uploadFile } from "../../store/user";
import { authenticate } from "../../store/session";
import "./EditPic.css";

const EditPic = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { setNum, setProfNum } = useModal();
  const [src, setSrc] = useState("");

  const submit = (e) => {
    const fileType = ["gif", "jpeg", "jpg", "png"];

    const filtered = fileType.find((item) =>
      e.target.files[0].type.includes(item)
    );

    if (!filtered) {
      return window.alert("Please provide an image file!");
    }

    const fileForm = {
      file: e.target.files[0],
    };

    dispatch(uploadFile(fileForm))
      .then(() => {
        dispatch(updateUser(user.id));
      })
      .then(() => dispatch(authenticate()));

    setProfNum((old) => old + 1);
    setNum(0);
  };

  const show = () => {
    document.querySelector(".edit-p-main").classList.add("hidden");
    document.querySelector(".remove-confirm-main").classList.remove("hidden");
  };

  const remove = () => {
    dispatch(deletePic()).then(() => dispatch(authenticate()));
    setNum(0);
  };

  return (
    <>
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
            accept="image/*"
            onChange={(e) => submit(e)}
          />
        </label>
        <div className="edit-option2" onClick={() => show()}>
          Remove Current Photo
        </div>
        <div className="edit-option3" onClick={() => setNum(0)}>
          Cancel
        </div>
      </div>
      <div className="remove-confirm-main hidden">
        <div className="er-top">
          <div className="er-top-bold">Remove Photo From Instagrand?</div>
          <div className="er-top-small">
            You will photo will be permanently removed after confirming.
          </div>
        </div>
        <div className="edit-option2" onClick={remove}>
          Remove
        </div>
        <div className="edit-option3" onClick={() => setNum(0)}>
          Cancel
        </div>
        <img src={src} />
      </div>
    </>
  );
};

export default EditPic;
