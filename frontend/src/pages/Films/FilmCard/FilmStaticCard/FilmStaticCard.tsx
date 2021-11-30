import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Col, Divider, Row } from "antd";
import { Professions } from "stores/FilmStore/FilmModel";
import DescriptionItem from "components/DescriptionItem";
import Block from "components/Block";
import noImage from "static/no_image.svg";
import styles from "./FilmStaticCard.module.scss";

const FilmStaticCard = () => {
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
          <React.Fragment key={e.name}>
            <a>{e.name}</a>
            <pre>{`${lastIndex === index ? "" : ", "}`}</pre>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <img
            src={
              filmsStore.selectedFilm.poster === null
                ? noImage
                : filmsStore.selectedFilm.poster
            }
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
    </>
  );
};

export default observer(FilmStaticCard);
