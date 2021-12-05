import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Router from "router/Router";
import "./App.scss";
import { Layout } from "antd";
import Header from "components/Header";
import { appStore } from "./stores";

const App: React.FC = () => {
  useEffect(() => {
    appStore.initializeApp();
  }, []);

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
