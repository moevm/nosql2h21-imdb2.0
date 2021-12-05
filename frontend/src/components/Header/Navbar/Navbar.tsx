import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import UiRoutes from "shared/constants/uiRoutes";
import { MenuTheme } from "antd/lib/menu/MenuContext";

interface IProps {
  theme: MenuTheme;
  className?: string;
}

const Navbar: React.FC<IProps> = ({ theme = "dark", className }) => {
  const location = useLocation();

  return (
    <Menu
      theme={theme}
      mode="horizontal"
      className={className}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={UiRoutes.Films}>
        <Link to={UiRoutes.Films}>Movies</Link>
      </Menu.Item>
      <Menu.Item key={UiRoutes.Names}>
        <Link to={UiRoutes.Names}>Names</Link>
      </Menu.Item>
      <Menu.Item key={UiRoutes.DbControl} disabled>
        <Link to={UiRoutes.DbControl}>DB Control</Link>
      </Menu.Item>
      <Menu.Item key={UiRoutes.Statistics} disabled>
        <Link to={UiRoutes.Statistics}>Statistics</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
