import { createReducer } from "@reduxjs/toolkit";

export const testimonialReducer = createReducer(
  {},
  {
    allTestimonialRequest: (state) => {
      state.loading = true;
    },
    allTestimonialSuccess: (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
    },
    allTestimonialFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
// admin 

    createTestimonialRequest: state => {
      state.loading = true;
    },
    createTestimonialSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createTestimonialFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTestimonialRequest: state => {
      state.loading = true;
    },
    deleteTestimonialSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTestimonialFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTestimonialRequest: (state) => {
      state.loading = true;
    },
    updateTestimonialSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateTestimonialFail: (state, action) => {
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
