import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { authenticatedRouteMaps, unAuthenticatedRouteMaps } from "./";
import routeRenderer from "./routesRenderer";
import useAuth from "../hooks/useAuth";

const DEFAULT_UNAUTHORIZED_LOCATION = "/login";
const unauthorizedRoutes = [DEFAULT_UNAUTHORIZED_LOCATION, "/signup"];

const ConfigureRoutes = () => {
  const { isAuthenticated, isVerifyingUser } = useAuth();

  const history = useHistory();

  React.useEffect(() => {
    if (isVerifyingUser) return;
    const currentLocation = window.location.pathname;
    if (isAuthenticated) {
      if (currentLocation === "/login") {
        history.push("/dashboard");
      } else {
        history.push(currentLocation || "/dashboard");
      }
    } else {
      if (unauthorizedRoutes.includes(history.location.pathname)) {
        history.push(currentLocation);
      } else {
        history.push(DEFAULT_UNAUTHORIZED_LOCATION);
      }
    }
  }, [history, isAuthenticated, isVerifyingUser]);

  if (isVerifyingUser) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return (
      <React.Fragment>
        {unAuthenticatedRouteMaps.map(routeRenderer)}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      {authenticatedRouteMaps.map(routeRenderer)}
    </React.Fragment>
  );
};

export default ConfigureRoutes;
