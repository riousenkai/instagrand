const GET_FOLLOWS = "follow/GET_FOLLOWS";
const GET_SUGGESTIONS = "follow/GET_SUGGESTIONS";

const getFollows = (users, userId) => ({
  type: GET_FOLLOWS,
  payload: users,
  userId,
});

const getSuggestions = (users) => ({
  type: GET_SUGGESTIONS,
  payload: users,
});

export const findFollows = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getFollows(data, userId));
  }
};

export const followUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(getFollows(data, userId));
  }
};

export const unFollowUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(getFollows(data, userId));
  }
};

export const findSuggestions = () => async (dispatch) => {
  const res = await fetch("/api/follows/suggestions");

  if (res.ok) {
    const data = await res.json();
    dispatch(getSuggestions(data));
  }
};

export const removeFollower = (id, userId) => async (dispatch) => {
  const res = await fetch(`/api/follows/remove/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(findFollows(data, userId));
  }
};

const initialState = { users: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWS:
      return { ...state, [action.userId]: action.payload };
    case GET_SUGGESTIONS:
      return { ...state, users: action.payload.final };
    default:
      return state;
  }
}
