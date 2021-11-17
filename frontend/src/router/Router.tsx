import React from "react";
import { Route } from "react-router-dom";
import Films from "pages/Films";
import UiRoutes from "shared/constants/uiRoutes";
import Names from "../pages/Names/Names";

const Router: React.FC = () => {
  return (
    <>
      <Route exact path={UiRoutes.Films}>
        <Films />
      </Route>
      <Route path={UiRoutes.Names}>
        <Names />
      </Route>
      <Route path={UiRoutes.DbControl}>
        <div>DB Control</div>
      </Route>
      <Route path={UiRoutes.Statistics}>
        <div>Statistics</div>
      </Route>
    </>
  );
};

export default Router;
