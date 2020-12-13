import * as types from "./constants";

export const getSingleLecture = (lectureSlug) => {
  return {
    type: types.GET_SINGLE_LECTURE,
    payload: lectureSlug,
  };
};
