import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/items`)
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        data: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const addItems = (data) => (dispatch) => {
  axios
    .post(`/api/items`, data)
    .then((res) =>
      dispatch({
        type: ADD_ITEMS,
        data: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteItems = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEMS,
        id,
      })
    )
    .catch((err) => console.log(err));
};
