import React from "react";
import { IUser } from "../interfaces/IUser";

export const UserContext = React.createContext<{
  user?: IUser;
  setUser?: React.Dispatch<React.SetStateAction<IUser | undefined>>;
} | null>(null);

const UserProvider: React.FC = (props) => {
  const [user, setUser] = React.useState<IUser>();
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
