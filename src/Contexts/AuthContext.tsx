import React from "react";

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
