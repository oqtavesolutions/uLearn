import { AuthenticatedRequest } from "../../../utils/axios";

const getAuthorEdit = async () => {
  const response = await AuthenticatedRequest.get(`/author`);
  return {
    message: "author retrieved successfully",
    author: response.data,
  };
};

const updateAuthor = async ({
  author_name,
  author_bio,
  author_slug,
  profile_image_url,
}) => {
  const response = await AuthenticatedRequest.post(`/author`, {
    author_slug,
    author_name,
    author_bio,
    profile_image_url,
  });
  return {
    message: "author updated successfully",
    author: response.data,
  };
};

const updateAuthorImage = async (payload) => {
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

export { getAuthorEdit, updateAuthor, updateAuthorImage };
