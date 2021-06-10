import Login from "../screens/login";
import Signup from "../screens/signup";
import Dashboard from "../screens/dashboard";

export const authenticatedRouteMaps = [
  {
    title: "dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
];

export const unAuthenticatedRouteMaps = [
  {
    title: "login",
    path: "/login",
    component: Login,
  },
  {
    title: "signup",
    path: "/signup",
    component: Signup,
  },
];
