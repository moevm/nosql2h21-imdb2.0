import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Router from "router/Router";
import "./App.scss";
import { Layout } from "antd";
import Header from "components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout className="layout">
          <Header />
          <Layout.Content className="content">
            <Router />
          </Layout.Content>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
