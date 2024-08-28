import { createReducer } from "@reduxjs/toolkit";

export const servicesReducer = createReducer(
  {},
  {
    allServicesRequest: (state) => {
      state.loading = true;
    },
    allServicesSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    allServicesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // admin

    createServicesRequest: (state) => {
      state.loading = true;
    },
    createServicesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createServicesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteServicesRequest: (state) => {
      state.loading = true;
    },
    deleteServicesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteServicesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateServicesRequest: (state) => {
      state.loading = true;
    },
    updateServicesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateServicesFail: (state, action) => {
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
