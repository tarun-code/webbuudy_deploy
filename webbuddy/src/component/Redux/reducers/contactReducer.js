import { createReducer } from "@reduxjs/toolkit";

export const contactReducer = createReducer(
  {},
  {
    
    allContactRequest: (state) => {
      state.loading = true;
    },
    allContactSuccess: (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    },
    allContactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
// admin 

    createContactRequest: state => {
      state.loading = true;
    },
    createContactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createContactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteContactRequest: state => {
      state.loading = true;
    },
    deleteContactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteContactFail: (state, action) => {
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
