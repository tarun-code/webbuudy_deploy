import { createReducer } from "@reduxjs/toolkit";

export const newsReducer = createReducer(
  {},
  {
    allNewsRequest: (state) => {
      state.loading = true;
    },
    allNewsSuccess: (state, action) => {
      state.loading = false;
      state.news = action.payload;
    },
    allNewsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // admin

    createNewsRequest: (state) => {
      state.loading = true;
    },
    createNewsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createNewsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteNewsRequest: (state) => {
      state.loading = true;
    },
    deleteNewsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteNewsFail: (state, action) => {
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
