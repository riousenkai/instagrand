const GET_USERS = "search/GET_USERS";

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const searchUsers = (obj) => async (dispatch) => {
  const res = await fetch(`/api/users/search`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getUsers(data));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
}
