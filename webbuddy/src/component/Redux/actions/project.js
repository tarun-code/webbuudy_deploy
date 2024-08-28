import { server } from "../store";
import axios from "axios";

export const getAllProject =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allProjectRequest" });

      const { data } = await axios.get(
        `${server}/projects?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: "allProjectSuccess", payload: data.projects });
    } catch (error) {
      dispatch({
        type: "allProjectFail",
        payload: error.response.data.message,
      });
    }
  };

export const createProject = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };
    dispatch({ type: "createProjectRequest" });

    const { data } = await axios.post(
      `${server}/createproject`,
      formData,
      config
    );

    dispatch({ type: "createProjectSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createProjectFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteProjectRequest" });

    const { data } = await axios.delete(`${server}/project/${id}`, config);

    dispatch({ type: "deleteProjectSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProjectFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProject = (editId,formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateProjectRequest" });

    const { data } = await axios.put(`${server}/project/${editId}`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },

      withCredentials: true,
    });

    dispatch({ type: "updateProjectSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProjectFail",
      payload: error.response.data.message,
    });
  }
};
