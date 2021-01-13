import * as types from "./constants";

export const createCourse = (payload) => {
  console.log("action");
  return {
    type: types.CREATE_COURSE,
    payload,
  };
};

export const uploadImage = (payload) => {
  console.log("action");
  return {
    type: types.UPLOAD_IMAGE,
    payload,
  };
};
