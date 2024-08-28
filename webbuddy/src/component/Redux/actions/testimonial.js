import { server } from "../store";
import axios from "axios";

export const getAllTestimonials =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: "allTestimonialRequest" });

      const { data } = await axios.get(
        `${server}/testimonials?keyword=${keyword}&category=${category}`,
        config
      );

      dispatch({ type: "allTestimonialSuccess", payload: data.testimonials });
    } catch (error) {
      dispatch({
        type: "allTestimonialFail",
        payload: error.response.data.message,
      });
    }
  };

export const createTestminial = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch({ type: "createTestimonialRequest" });

    const { data } = await axios.post(
      `${server}/createtestimonial`,
      formData,
      config
    );

    console.log(data);
    dispatch({ type: "createTestimonialSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createTestimonialFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteTestimonial = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteTestimonialRequest" });

    const { data } = await axios.delete(`${server}/testimonial/${id}`, config);

    dispatch({ type: "deleteTestimonialSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteTestimonialFail",
      payload: error.response.data.message,
    });
  }
};

export const updateTestimonial = (editId, formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateTestimonialRequest" });

    const { data } = await axios.put(
      `${server}/testimonial/${editId}`,
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },

        withCredentials: true,
      }
    );

    dispatch({ type: "updateTestimonialSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateTestimonialFail",
      payload: error.response.data.message,
    });
  }
};
