import { server } from "../store";
import axios from "axios";

export const getAllServices =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allServicesRequest" });

      const { data } = await axios.get(
        `${server}/services?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: "allServicesSuccess", payload: data.services });
    } catch (error) {
      dispatch({
        type: "allServicesFail",
        payload: error.response.data.message,
      });
    }
  };

export const createServices = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch({ type: "createServicesRequest" });

    const { data } = await axios.post(
      `${server}/createservice`,
      formData,
      config
    );

    dispatch({ type: "createServicesSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createServicesFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteServices = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteServicesRequest" });

    const { data } = await axios.delete(`${server}/service/${id}`, config);

    dispatch({ type: "deleteServicesSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteServicesFail",
      payload: error.response.data.message,
    });
  }
};

export const updateServices = (editId, formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateServicesRequest" });

    const { data } = await axios.put(`${server}/service/${editId}`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },

      withCredentials: true,
    });

    dispatch({ type: "updateServicesSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateServicesFail",
      payload: error.response.data.message,
    });
  }
};
