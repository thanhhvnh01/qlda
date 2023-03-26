import { ACTION_TYPES } from "@store/actionTypes";

export const getAllCartProductAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.GET_ALL_PRODUCT,
      data,
    });
  };
};

export const handleAddCartAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ADD_CART,
      data,
    });
  };
};

export const handleDeleteCartAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.DELETE_CART,
      data,
    });
  };
};

export const handleRemoveCartAC = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_CART,
    });
  };
};

export const handleUpdateCartAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_CART,
      data,
    });
  };
};
export const handleIncreaseCartAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.INCREASE_QUANTITY,
      data,
    });
  };
};
export const handleDecreaseCartAC = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.DECREASE_QUANTITY,
      data,
    });
  };
};

export const getNumberCartAC = () => {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.GET_NUMBER_CART,
    });
  };
};
