import React from "react";
import { appStore, filmsStore, namesStore } from "stores";
import { observer } from "mobx-react";
import { Col, Divider, Row } from "antd";
import DescriptionItem from "components/DescriptionItem";
import Block from "components/Block";
import noImage from "static/no_image.svg";
import { toJS } from "mobx";
import { getDeletedProfessions } from "utils/getDeletedProfessions";
import namesToFormNames from "utils/namesToFormNames";
import { Professions } from "shared/constants/professions";
import { useHistory } from "react-router-dom";
import UiRoutes from "shared/constants/uiRoutes";
import styles from "./NameStaticCard.module.scss";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

const NameStaticCard = () => {
  const [, allProfessions] = namesToFormNames(toJS(namesStore.selectedName));

  const history = useHistory();

  const onFilmClick = (filmId: string) => {
    history.push(UiRoutes.Films);
    filmsStore.openFilmCard(filmId);
  };

  const deletedProfessions = getDeletedProfessions(allProfessions);

  const renderCastBlock = (profession: Professions): React.ReactNode => {
    const professions =
      namesStore.selectedName.getNamesByProfession(profession);

    const lastIndex = professions.length - 1;

    return (
      <>
        {professions.map((e, index) => (
          <React.Fragment key={e.title}>
            <a onClick={() => onFilmClick(e.filmId)}>{e.title}</a>
            <pre>{`${lastIndex === index ? "" : ", "}`}</pre>
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderCast = (): React.ReactNode => {
    return (
      <>
        {appStore.ProfessionArray.map((e) => {
          if (e === Professions.Actor) return null;

          if (deletedProfessions.includes(e)) return null;

          return (
            <React.Fragment key={e}>
              <Block
                title={capitalizeFirstLetter(e)}
                content={renderCastBlock(e)}
              />
              <Divider />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const actor = namesStore.selectedName
    .getNamesByProfession(Professions.Actor)
    .map((a) => (
      <React.Fragment key={`${a.filmId}${a.characters}`}>
        <Col span={12}>
          <a onClick={() => onFilmClick(a.filmId)}>{a.title}</a>
        </Col>
        <Col span={12}>{a.characters}</Col>
      </React.Fragment>
    ));

  return (
    <>
      <Row>
        <Col span={12}>
          <img
            src={
              namesStore.selectedName.image === null
                ? noImage
                : namesStore.selectedName.image
            }
            alt="poster"
            className={styles.imageWrapper}
          />
        </Col>

        <Col span={12}>
          <DescriptionItem
            title="Birth Year"
            content={namesStore.selectedName.birthYear}
          />

          {namesStore.selectedName.deathYear !== null && (
            <DescriptionItem
              title="Death year"
              content={namesStore.selectedName.deathYear}
            />
          )}
        </Col>
      </Row>

      <Divider />

      {renderCast()}
      {actor.length > 0 && (
        <Block
          title={"Actor"}
          content={
            <>
              <Col span={12}>
                <b>Movie</b>
              </Col>
              <Col span={12}>
                <b>Role</b>
              </Col>
              {actor}
            </>
          }
        />
      )}
    </>
  );
};

export default observer(NameStaticCard);
