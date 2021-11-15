import React from "react";
import logo from "static/logo.png";

interface IProps {
  logoPath?: string;
  className?: string;
}

const Logo: React.FC<IProps> = ({ logoPath, className }) => {
  return <img src={logoPath || logo} alt="logo" className={className || ""} />;
};

export default Logo;
