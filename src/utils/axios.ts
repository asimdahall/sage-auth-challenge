import axios from "axios";
import { getLSToken } from "./tokens";

const baseURL = "http://65.0.89.70:5252/api/";

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "JWT " + getLSToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
