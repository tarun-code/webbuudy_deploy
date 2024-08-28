import { server } from "../store";
import axios from "axios";

export const getAllBlog =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allBlogRequest" });

      const { data } = await axios.get(
        `${server}/posts?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: "allBlogSuccess", payload: data.blogs });
    } catch (error) {
      dispatch({
        type: "allBlogFail",
        payload: error.response.data.message,
      });
    }
  };

export const createBlog = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch({ type: "createBlogRequest" });

    const { data } = await axios.post(`${server}/addpost`, formData, config);

    dispatch({ type: "createBlogSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createBlogFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteBlogRequest" });

    const { data } = await axios.delete(`${server}/post/${id}`, config);

    dispatch({ type: "deleteBlogSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteBlogFail",
      payload: error.response.data.message,
    });
  }
};

export const updateBlog = (editId, formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateBlogRequest" });

    const { data } = await axios.put(`${server}/post/${editId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },

      withCredentials: true,
    });

    dispatch({ type: "updateBlogSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateBlogFail",
      payload: error.response.data.message,
    });
  }
};

export const getBlog = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "BlogRequest" });

    const { data } = await axios.get(`${server}/post/${id}`, config);

    dispatch({ type: "BlogSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "BlogFail",
      payload: error.response.data.message,
    });
  }
};

// comment

export const createComment = (name, comment, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "createCommentRequest" });

    const { data } = await axios.post(
      `${server}/addcomment/${id}`,
      { name, comment },
      config
    );

    dispatch({ type: "createCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createCommentFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteComment = (blogId, commentId) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteCommentRequest" });

    const { data } = await axios.delete(
      `${server}/deletecomment/${blogId}/${commentId}`,
      config
    );

    dispatch({ type: "deleteCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteCommentFail",
      payload: error.response.data.message,
    });
  }
};
