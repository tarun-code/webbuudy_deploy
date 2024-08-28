import { server } from "../store";
import axios from "axios";

export const getAllContacts =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: "allContactRequest" });

      const { data } = await axios.get(
        `${server}/contacts?keyword=${keyword}&category=${category}`,
        config
      );

      dispatch({ type: "allContactSuccess", payload: data.contacts });
    } catch (error) {
      dispatch({
        type: "allContactFail",
        payload: error.response.data.message,
      });
    }
  };

export const createContact =
  (name, email, number, subject, query) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      dispatch({ type: "createContactRequest" });

      const { data } = await axios.post(
        `${server}/createcontact`,
        { name, email, number, subject, query },
        config
      );

      dispatch({ type: "createContactSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "createContactFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteContact = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteContactRequest" });

    const { data } = await axios.delete(
      `${server}/deletecontact/${id}`,
      config
    );

    dispatch({ type: "deleteContactSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteContactFail",
      payload: error.response.data.message,
    });
  }
};
