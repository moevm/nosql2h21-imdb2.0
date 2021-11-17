import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Drawer } from "antd";

const FilmCard = () => {
  return (
    <Drawer
      title={filmsStore.selectedFilm?.title}
      placement="right"
      onClose={filmsStore.closeFilmCard}
      visible={filmsStore.isCardOpen}
      size="large"
    >
      <p>{filmsStore.selectedFilm?.professions[0].movie}</p>
    </Drawer>
  );
};

export default observer(FilmCard);
