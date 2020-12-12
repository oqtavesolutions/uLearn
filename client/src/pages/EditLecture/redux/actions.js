import * as types from "./constants";

export const getLectureEdit = (payload) => {
  console.log("action");
  return {
    type: types.GET_LECTURE_EDIT,
    payload,
  };
};

export const updateLecture = (payload) => {
  return {
    type: types.UPDATE_LECTURE,
    payload,
  };
};
