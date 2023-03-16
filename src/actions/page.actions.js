import axios from "../helpers/axios";
import { pageConstants } from "./constant";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    try {
      const res = await axios.post("/page/create", form);
      if (res.status === 200) {
        dispatch({
          type: pageConstants.CREATE_PAGE_SUCCESS,
          payload: {
            page: res.data.pageData,
          },
        });
      } else {
        dispatch({
          type: pageConstants.CREATE_PAGE_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
        console.log(error)
    }
  };
};
