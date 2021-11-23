const GET_MESSAGES = "messages/GET_MESSAGES";

const getMessages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});

export const getChannelMessages = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${channelId}`);
  const data = await res.json();
  dispatch(getMessages(data));
};

export const createMessage = (obj) => async (dispatch) => {
  const res = await fetch(`/api/messages/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getMessages(data));
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload.messages };
    default:
      return state;
  }
}
