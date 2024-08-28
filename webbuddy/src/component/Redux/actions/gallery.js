import { server } from "../store";
import axios from "axios";

export const getAllGallery =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allGalleryRequest" });

      const { data } = await axios.get(
        `${server}/gallery?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: "allGallerySuccess", payload: data.gallery });
    } catch (error) {
      dispatch({
        type: "allGalleryFail",
        payload: error.response.data.message,
      });
    }
  };

export const createGallery = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch({ type: "createGalleryRequest" });

    const { data } = await axios.post(`${server}/addgallery`, formData, config);

    dispatch({ type: "createGallerySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createGalleryFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteGallery = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteGalleryRequest" });

    const { data } = await axios.delete(`${server}/gallery/${id}`, config);

    dispatch({ type: "deleteGallerySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteGalleryFail",
      payload: error.response.data.message,
    });
  }
};

export const updateGallery = (editId, formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateGalleryRequest" });

    const { data } = await axios.put(`${server}/gallery/${editId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },

      withCredentials: true,
    });

    dispatch({ type: "updateGallerySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateGalleryFail",
      payload: error.response.data.message,
    });
  }
};
