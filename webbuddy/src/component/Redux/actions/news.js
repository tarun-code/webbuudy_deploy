import { server } from "../store";
import axios from "axios";

export const getAllNews =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: "allNewsRequest" });

      const { data } = await axios.get(
        `${server}/news?keyword=${keyword}&category=${category}`,
        config
      );

      dispatch({ type: "allNewsSuccess", payload: data.news });
    } catch (error) {
      dispatch({
        type: "allNewsFail",
        payload: error.response.data.message,
      });
    }
  };

export const createNews = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "createNewsRequest" });

    const { data } = await axios.post(
      `${server}/createnews`,
      { email },
      config
    );

    dispatch({ type: "createNewsSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createNewsFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteNewsRequest" });

    const { data } = await axios.delete(`${server}/deletenews/${id}`, config);

    dispatch({ type: "deleteNewsSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteNewsFail",
      payload: error.response.data.message,
    });
  }
};
