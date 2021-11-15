import React from "react";
import { Layout } from "antd";
import Logo from "components/Logo";
import { MenuTheme } from "antd/lib/menu/MenuContext";
import SearchBar from "components/SearchBar";
import Navbar from "./Navbar";
import styles from "./Header.module.scss";

export interface IProps {
  theme?: MenuTheme;
}

const Header: React.FC<IProps> = ({ theme = "dark" }) => {
  return (
    <Layout.Header className={styles.header}>
      <Logo className={styles.logo} />
      <Navbar theme={theme} className={styles.navbar} />
      <SearchBar className={styles.searchBar} />
    </Layout.Header>
  );
};

export default Header;
