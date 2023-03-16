import axios from "../helpers/axios";
import { userConstants } from "./constant";

export const signup = (user) => {
  // console.log(user);
  return async (dispath) => {
    dispath({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post("/admin/signup", {
      ...user,
    });
    // console.log(res);
    if (res.status === 200) {
      const { message } = res.data;
      dispath({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispath({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
