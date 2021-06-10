import React from "react";
import { Route, useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import DashboardLayout from "../Layouts/DashboardLayout";

interface Props {
  title: string;
  component: () => JSX.Element | null;
  path: string;
}

const routeRenderer = ({ title, component: Component, path }: Props) => {
  const location = useLocation();
  const render = path.includes("/dashboard") ? (
    <DashboardLayout>
      <Component key={location.key} />
    </DashboardLayout>
  ) : (
    <Component />
  );
  return (
    <React.Fragment key={path}>
      <Route exact path={path}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {render}
      </Route>
    </React.Fragment>
  );
};

export default routeRenderer;
