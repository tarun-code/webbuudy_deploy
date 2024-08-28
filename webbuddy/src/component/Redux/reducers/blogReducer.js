import { createReducer } from "@reduxjs/toolkit";

export const blogReducer = createReducer(
  { comments: [], blogs: [] },
  {
    allBlogRequest: (state) => {
      state.loading = true;
    },
    allBlogSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    allBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // BlogRequest: (state) => {
    //   state.loading = true;
    // },
    // BlogSuccess: (state, action) => {
    //   state.loading = false;
    //   state.blogs = action.payload;
    // },
    // BlogFail: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    // admin

    createBlogRequest: (state) => {
      state.loading = true;
    },
    createBlogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteBlogRequest: (state) => {
      state.loading = true;
    },
    deleteBlogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBlogRequest: (state) => {
      state.loading = true;
    },
    updateBlogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // comment

    createCommentRequest: (state) => {
      state.loading = true;
    },
    createCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCommentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
