import { AuthenticatedRequest } from "../../../utils/axios";

const createCourse = async (payload) => {
  console.log(AuthenticatedRequest);
  const response = await AuthenticatedRequest.post("/course/create", {
    ...payload,
  });
  return {
    message: "course is created successfully",
    ...response.data,
  };
};

const uploadImage = async (payload) => {
  const data = new FormData();
  data.append("thumbnail", payload[0]);
  const response = await AuthenticatedRequest.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return {
    message: "file uploaded successfully",
    ...response.data,
  };
};

export default createCourse;
export { uploadImage };
