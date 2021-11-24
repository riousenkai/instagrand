const GET_CHANNELS = "channels/GET_CHANNELS";

const getChannels = (channels) => ({
  type: GET_CHANNELS,
  payload: channels,
});

export const findChannels = () => async (dispatch) => {
  const res = await fetch("/api/channels/all");
  const data = await res.json();
  if (res.ok) {
    dispatch(getChannels(data));
  }
};

export const createChannels = (user2) => async (dispatch) => {
  const res = await fetch(`/api/channels/new/${user2}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(getChannels(data));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { ...state, channels: action.payload.channels };
    default:
      return state;
  }
}
