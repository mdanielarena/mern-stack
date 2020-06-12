import {
  GET_ITEMS,
  ADD_ITEMS,
  DELETE_ITEMS,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.id),
      };
    case ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, action.data],
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
