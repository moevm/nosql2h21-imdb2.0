import React from "react";
import Search from "antd/es/input/Search";

interface IProps {
  className?: string;
}

const SearchBar: React.FC<IProps> = ({ className }) => {
  return (
    <Search
      placeholder="enter movie title or famous celebrity"
      className={className || ""}
    />
  );
};

export default SearchBar;
