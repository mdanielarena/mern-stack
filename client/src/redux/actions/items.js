import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors } from "./errors";

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
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItems = (data) => (dispatch, getState) => {
  axios
    .post(`/api/items`, data, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEMS,
        data: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItems = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEMS,
        id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
