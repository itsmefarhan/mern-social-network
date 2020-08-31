import React, { createContext, useReducer } from "react";
import postReducer from "./postReducer";
import axios from "axios";

export const PostContext = createContext();

const initialState = {
  posts: [],
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // create post
  const createPost = async (id, post) => {
    try {
      const res = await axios.post(`/api/posts/${id}`, post, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: "CREATE_POST", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // get newsfeed posts
  const newsFeed = async (id) => {
    try {
      const res = await axios.get(`/api/posts/feed/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({ type: "GET_POSTS", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // get profile posts
  const profilePosts = async (id) => {
    try {
      const res = await axios.get(`/api/posts/userposts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({ type: "PROFILE_POSTS", payload: res.data });
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "DELETE_POST", payload: postId });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        createPost,
        newsFeed,
        profilePosts,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
