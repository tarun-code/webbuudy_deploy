import { createReducer } from "@reduxjs/toolkit";

export const projectReducer = createReducer(
  {},
  {
    allProjectRequest: (state) => {
      state.loading = true;
    },
    allProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    allProjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // admin

    createProjectRequest: (state) => {
      state.loading = true;
    },
    createProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createProjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProjectRequest: (state) => {
      state.loading = true;
    },
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectRequest: (state) => {
      state.loading = true;
    },
    updateProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProjectFail: (state, action) => {
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
