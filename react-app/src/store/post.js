const GET_POSTS = "post/GET_POSTS";
const GET_SINGLE_POST = "post/GET_SINGLE_POST";
const GET_FOLLOWING_POSTS = "post/GET_FOLLOWER_POSTS";

const getFollowingPosts = (posts) => ({
  type: GET_FOLLOWING_POSTS,
  payload: posts,
});

const getPosts = (posts, userId) => ({
  type: GET_POSTS,
  payload: posts,
  userId,
});

const getInfo = (posts) => ({
  type: GET_SINGLE_POST,
  payload: posts,
});

export const likePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(getFollowingPosts(data));
};

export const deleteComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(getFollowingPosts(data));
};

export const submitComment = (obj) => async (dispatch) => {
  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getFollowingPosts(data));
};

export const editPost = (obj, id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getFollowingPosts(data));
};

export const deletePost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(getFollowingPosts(data));
};

export const createPost = (post) => async (dispatch) => {
  const res = await fetch("/api/posts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const postInfo = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/id/${postId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getInfo(data));
  }
};

export const findPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getPosts(data, userId));
  }
};

export const findFollowingPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/following`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getFollowingPosts(data));
  }
};

export const uploadFile = (fileForm) => async (dispatch) => {
  const {
    user_id,
    /* all,
       other,
       form,
       fields, */
    file, // this is the file for uploading
  } = fileForm;

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/<your_api_route>", {
    method: "POST",
    body: form,
  });
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, [action.userId]: action.payload };
    case GET_FOLLOWING_POSTS:
      return { ...state, following: action.payload.following };
    case GET_SINGLE_POST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
