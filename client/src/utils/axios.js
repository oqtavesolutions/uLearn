import axios from "axios";
import firebase from "../config";

const Request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  params: {},
});

const AuthenticatedRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  params: {},
});

AuthenticatedRequest.interceptors.request.use(
  async (config) => {
    config.headers.firebase_token = await firebase
      .auth()
      .currentUser.getIdToken();
    return config;
  },
  (error) => Promise.reject(error)
);

export { Request, AuthenticatedRequest };
