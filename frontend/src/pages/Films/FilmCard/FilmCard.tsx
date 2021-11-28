import React from "react";

import FilmStaticCard from "./FilmStaticCard";
import FilmEditingCard from "./FilmEditingCard/FilmEditingCard";

interface IProps {
  isEditable: boolean;
}

const FilmCard: React.FC<IProps> = ({ isEditable }) => {
  return <>{isEditable ? <FilmEditingCard /> : <FilmStaticCard />}</>;
};

export default FilmCard;
