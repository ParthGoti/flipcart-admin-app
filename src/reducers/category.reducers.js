import { categoryConstants } from "../actions/constant";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentid, categories, category) => {
  let myCategories = [];

  if (parentid === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }

  for (const cat of categories) {
    if (cat._id === parentid) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentid: category.parentid,
        type: category.type,
        children: [],
      };
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentid, cat.children, category)
          : [],
      });
    }
  }
  return myCategories;
};

export default (state = initState, action) => {
  // console.log(action.payload.categories);
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentid,
        state.categories,
        action.payload.category
      );
      console.log(updatedCategories);
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    default:
      break;
  }
  return state;
};
