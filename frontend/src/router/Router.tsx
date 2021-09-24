import React from "react";
import { Route } from "react-router-dom";
import Films from "pages/Films";

const Router = () => {
  return (
    <>
      <Route exact path="">
        <Films />
      </Route>
    </>
  );
};

export default Router;
