import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Col, Divider, Row } from "antd";
import DescriptionItem from "components/DescriptionItem";
import Block from "components/Block";
import noImage from "static/no_image.svg";
import { toJS } from "mobx";
import { getDeletedProfessions } from "utils/getDeletedProfessions";
import filmsToFormFilms from "utils/filmsToFormFilms";
import { ProfessionArray, Professions } from "shared/constants/professions";
import styles from "./FilmStaticCard.module.scss";
import { renderDuration } from "../../../../utils/renderDuration";

const FilmStaticCard = () => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }
  const [, allProfessions] = filmsToFormFilms(toJS(filmsStore.selectedFilm));

  const deletedProfessions = getDeletedProfessions(allProfessions);

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

  const renderCast = (): React.ReactNode => {
    return (
      <>
        {ProfessionArray.map((e) => {
          if (e === Professions.Actor) return null;

          if (deletedProfessions.includes(e)) return null;

          return (
            <React.Fragment key={e}>
              <Block title={`${e}(s)`} content={renderCastBlock(e)} />
              <Divider />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const genres: string = filmsStore.selectedFilm.genres
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
    .join(", ");

  const duration: string = renderDuration(filmsStore.selectedFilm.duration);

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
          {genres.length > 0 && (
            <DescriptionItem title="Genres" content={genres} />
          )}
          {duration !== "-" && (
            <DescriptionItem title="Duration" content={duration} />
          )}
        </Col>
      </Row>

      <Divider />

      {renderCast()}

      <Block
        title={"Actors"}
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
