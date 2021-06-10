import React from "react";
import { UserContext } from "../Contexts/UserContext";

const useUser = () => {
  const values = React.useContext(UserContext);
  if (!values) return {};
  return {
    user: values.user,
    setUser: values.setUser,
  };
};

export default useUser;
