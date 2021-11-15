import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import UiRoutes from "shared/constants/uiRoutes";
import { MenuTheme } from "antd/lib/menu/MenuContext";

interface IProps {
  theme: MenuTheme;
  className?: string;
}

const Navbar: React.FC<IProps> = ({ theme = "dark", className }) => {
  return (
    <Menu theme={theme} mode="horizontal" className={className}>
      <Menu.Item>
        <Link to={UiRoutes.Films}>Movies</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={UiRoutes.Names}>Names</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={UiRoutes.DbControl}>DB Control</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={UiRoutes.Statistics}>Statistics</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
