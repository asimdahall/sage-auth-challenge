import instance from "../utils/axios";

interface ILoginPayload {
  email: string;
  password: string;
}

const AUTH_BASE_URL = "auth";

export const postLogin = (payload: ILoginPayload) => {
  return instance.post("/login", payload);
};

export const postRegister = (payload: ILoginPayload) => {
  return instance.post("/register", payload);
};

export const getProfile = () => {
  return instance.get(AUTH_BASE_URL + "/profile");
};
