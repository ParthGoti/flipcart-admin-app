const createCategoryList = (categories, option = []) => {
    for (const category of categories) {
      option.push({
        value: category._id,
        name: category.name,
        parentid: category.parentid,
        type:category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };

  export default createCategoryList;