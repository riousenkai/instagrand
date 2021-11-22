const SET_USER = "user/SET_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const updateUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  dispatch(setUser(data));
};

export const uploadFile = (fileForm) => async (dispatch) => {
  const { file } = fileForm;

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/users/picture", {
    method: "POST",
    body: form,
  });
};

export const deletePic = () => async (dispatch) => {
  const res = await fetch("/api/users/picture", {
    method: "DELETE",
  });
  const data = await res.json();
  dispatch(setUser(data));
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    default:
      return state;
  }
}
