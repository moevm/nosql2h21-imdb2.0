import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Button, Col, Divider, Drawer, Row, Space } from "antd";
import shiningPoster from "static/test/shiningPoster.png";
import { Professions } from "stores/FilmStore/FilmModel";
import DescriptionItem from "components/DescriptionItem";
import Block from "components/Block";
import styles from "./FilmCard.module.scss";

const FilmCard = () => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const renderCastBlock = (profession: Professions): React.ReactNode => {
    if (filmsStore.selectedFilm === null) return null;

    const professions =
      filmsStore.selectedFilm.getNamesByProfession(profession);

    const lastIndex = professions.length - 1;

    return (
      <>
        {professions.map((e, index) => (
          <>
            <a key={e.name}>{e.name}</a>
            <pre>{`${lastIndex === index ? "" : ", "}`}</pre>
          </>
        ))}
      </>
    );
  };

  return (
    <Drawer
      title={filmsStore.selectedFilm.title}
      placement="right"
      onClose={filmsStore.closeFilmCard}
      visible={filmsStore.isCardOpen}
      width={800}
      extra={
        <Space>
          <Button>Edit</Button>
        </Space>
      }
    >
      <Row>
        <Col span={12}>
          <img
            src={shiningPoster}
            alt="poster"
            className={styles.imageWrapper}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Year"
            content={filmsStore.selectedFilm.releaseYear}
          />
          <DescriptionItem
            title="Certificate"
            content={filmsStore.selectedFilm.isAdult ? "18+" : "6+"}
          />
          <DescriptionItem
            title="Genres"
            content={filmsStore.selectedFilm.genres
              .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
              .join(", ")}
          />
        </Col>
      </Row>

      <Divider />

      <Block
        title={"Directed by"}
        content={renderCastBlock(Professions.Director)}
      />

      <Divider />

      <Block
        title={"Written by"}
        content={renderCastBlock(Professions.Writer)}
      />

      <Divider />

      <Block
        title={"Cast"}
        content={
          <>
            <Col span={12}>
              <b>Actor</b>
            </Col>
            <Col span={12}>
              <b>Role</b>
            </Col>
            {filmsStore.selectedFilm
              .getNamesByProfession(Professions.Actor)
              .map((a) => (
                <React.Fragment key={a.name}>
                  <Col span={12}>
                    <a>{a.name}</a>
                  </Col>
                  <Col span={12}>{a.character}</Col>
                </React.Fragment>
              ))}
          </>
        }
      />
    </Drawer>
  );
};

export default observer(FilmCard);
