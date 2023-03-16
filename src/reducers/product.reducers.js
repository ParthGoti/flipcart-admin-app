import { productConstants } from "../actions/constant";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  // console.log("product",action.payload)
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    default:
      break;
  }
  return state;
};
