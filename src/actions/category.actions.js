import axios from "../helpers/axios";
import { categoryConstants } from "./constant";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get("/category/get");
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: categoryList,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`/category/create`, form);
      if (res.status === 200) {
        const { _category } = res.data;
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: {
            category: _category,
          },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post(`/category/update`, form);
    if (res.status === 200) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
    const res = await axios.post(`/category/delete`, {
      payload: {
        ids,
      },
    });

    if (res.status === 200) {
      dispatch(getAllCategory());
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
    } else {
      dispatch({
        type: categoryConstants.DELETE_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export { getAllCategory };
