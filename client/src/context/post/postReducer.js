export default (state, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "PROFILE_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "LIKE_POST":
      return {
        ...state,
        like: action.payload,
      };
    case "UNLIKE_POST":
      return {
        ...state,
        unlike: action.payload,
      };
    default:
      return state;
  }
};
