import * as types from "./constants";

export const getAuthorEdit = () => {
  console.log("action");
  return {
    type: types.GET_AUTHOR_EDIT,
  };
};

export const updateAuthor = (payload) => {
  return {
    type: types.UPDATE_AUTHOR,
    payload,
  };
};

export const updateAuthorImage = (payload) => {
  console.log("action");
  return {
    type: types.UPDATE_AUTHOR_IMAGE,
    payload,
  };
};
