const GET_POSTS = "post/GET_POSTS";
const GET_FOLLOWING_POSTS = "post/GET_FOLLOWER_POSTS"

const getFollowingPosts = (posts) => ({
    type: GET_FOLLOWING_POSTS,
    payload: posts
})

const getPosts = (posts, userId) => ({
  type: GET_POSTS,
  payload: posts,
  userId,
});

export const editPost = (obj, id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    dispatch(getFollowingPosts(data))
}

export const createPost = (post) => async (dispatch) => {
    const res = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
}

export const findPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getPosts(data, userId));
  }
};

export const findFollowingPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/following`);
  const data = await res.json()
  if (res.ok) {
    dispatch(getFollowingPosts(data))
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, [action.userId]: action.payload };
    case GET_FOLLOWING_POSTS:
        return {...state, following: action.payload.following}
    default:
      return state;
  }
}
