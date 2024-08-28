import { createReducer } from "@reduxjs/toolkit";

export const galleryReducer = createReducer(
  {},
  {
    allGalleryRequest: (state) => {
      state.loading = true;
    },
    allGallerySuccess: (state, action) => {
      state.loading = false;
      state.gallery = action.payload;
    },
    allGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // admin

    createGalleryRequest: (state) => {
      state.loading = true;
    },
    createGallerySuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteGalleryRequest: (state) => {
      state.loading = true;
    },
    deleteGallerySuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateGalleryRequest: (state) => {
      state.loading = true;
    },
    updateGallerySuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateGalleryFail: (state, action) => {
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
