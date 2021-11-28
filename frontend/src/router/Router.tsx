import React from "react";
import { Redirect, Route } from "react-router-dom";
import Films from "pages/Films";
import UiRoutes from "shared/constants/uiRoutes";
import Names from "../pages/Names/Names";
import DataBaseControlMenu from "../pages/DataBaseControlMenu/DataBaseControlMenu";

const Router: React.FC = () => {
  return (
    <>
      <Route path={UiRoutes.Films}>
        <Films />
      </Route>
      <Route path={UiRoutes.Names}>
        <Names />
      </Route>
      <Route path={UiRoutes.DbControl}>
        <DataBaseControlMenu />
      </Route>
      <Route path={UiRoutes.Statistics}>
        <div>Statistics</div>
      </Route>
      <Redirect exact from="/" to={UiRoutes.Films} />
      <Redirect exact from="*" to={UiRoutes.Films} />
    </>
  );
};

export default Router;
