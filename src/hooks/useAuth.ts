import React from "react";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getProfile, postLogin } from "../api/user-auth";
import { HTTPStatusEnum } from "../enums/HTTPStatusEnum";
import { AuthContext } from "../Contexts/AuthContext";
import { getLSToken, postLSToken } from "../utils/tokens";
import useUser from "./useUser";

const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);
  const [isVerifyingUser, setIsVerifying] = React.useState(true);
  const toast = useToast();
  const history = useHistory();

  const { setUser } = useUser();

  const fetchUserData = React.useCallback(() => {
    getProfile()
      .then((response) => {
        if (response.status === HTTPStatusEnum.OK) {
          setIsAuthenticated?.(true);
          setUser?.(response.data);
        }
      })
      .catch(() => {
        setIsAuthenticated?.(false);
        history.push("/login");
      })
      .finally(() => setIsVerifying(false));
  }, [history, setIsAuthenticated]);

  React.useEffect(() => {
    const token = getLSToken();
    if (!token || isAuthenticated) {
      setIsVerifying(false);
      return;
    }
    fetchUserData();
  }, [fetchUserData, history, isAuthenticated, setIsAuthenticated, toast]);

  const loginUser = React.useCallback(
    (
      payload: { email: string; password: string },
      options?: {
        onSuccessCallback?: () => void;
        onErrorCallback?: () => void;
        onFinallyCallback?: () => void;
      }
    ) => {
      postLogin(payload)
        .then((response) => {
          if (response.status === HTTPStatusEnum.OK) {
            options?.onSuccessCallback?.();
            fetchUserData();
            postLSToken(response.data.token);
            setIsAuthenticated?.(true);
            toast({
              title: "Login Successful",
              description: "Logged in successfully",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          options?.onSuccessCallback?.();
          if (error?.response?.status === HTTPStatusEnum.UNAUTHORIZED) {
            toast({
              title: "Login Error",
              description: "Your credentials doesn't match, please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Login Error",
              description:
                "Something went wrong while logging in, please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .finally(options?.onFinallyCallback);
    },
    [fetchUserData, setIsAuthenticated, toast]
  );

  const handleLogout = React.useCallback(() => {
    setUser?.({});
    setIsAuthenticated?.(false);
    postLSToken("");
  }, [setIsAuthenticated, setUser]);

  return { handleLogout, loginUser, isAuthenticated, isVerifyingUser };
};

export default useAuth;
