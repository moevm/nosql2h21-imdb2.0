import React from "react";

import { Button, Drawer, Form, Space } from "antd";
import { filmsStore } from "stores";
import parseCast from "utils/castParsing";
import { haveErrors } from "utils/isFormHaveErrors";
import { observer } from "mobx-react";
import { CardMode } from "shared/constants/common";
import { IFullFilmDto } from "shared/dtos/FilmDto";
import FilmStaticCard from "./FilmStaticCard";
import FilmFormCard from "./FilmFormCard";

const FilmCard = () => {
  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();

  const onCloseEditingForm = () => {
    filmsStore.setMode(CardMode.Static);
    filmsStore.setCanSubmitForm(false);
    filmsStore.selectedFilm?.setNewPoster(null);
  };

  const onCloseCard = () => {
    filmsStore.closeFilmCard();
  };

  const onOpenEditingForm = () => {
    filmsStore.setMode(CardMode.Editing);
  };

  const onSubmit = () => {
    if (haveErrors(castForm) || haveErrors(infoForm)) {
      return;
    }

    const cast = castForm.getFieldsValue();
    const professions = parseCast(cast);
    const movieInfo = infoForm.getFieldsValue();
    const result: Omit<IFullFilmDto, "_id"> = {
      ...movieInfo,
      crew: [...professions],
      poster: filmsStore.selectedFilm?.newPoster,
      isAdult: filmsStore.selectedFilm?.isAdult !== "6+",
    };

    infoForm.submit();
    castForm.submit();

    // eslint-disable-next-line no-unused-expressions
    filmsStore.mode === CardMode.Editing
      ? filmsStore.updateFilm({
          ...result,
          _id: filmsStore.selectedFilm?.id || "",
          title: filmsStore.selectedFilm?.title || "",
        })
      : filmsStore.postFilm(result);
    filmsStore.closeFilmCard();
  };

  return (
    <Drawer
      title={filmsStore.selectedFilm.title}
      placement="right"
      onClose={onCloseCard}
      visible={filmsStore.mode !== CardMode.Closed}
      width={800}
      extra={
        <>
          {filmsStore.mode === CardMode.Editing && (
            <Space>
              <Button
                onClick={onSubmit}
                disabled={!filmsStore.canSubmitForm}
                type="primary"
              >
                Save
              </Button>
              <Button onClick={onCloseEditingForm}>Cancel</Button>
            </Space>
          )}

          {filmsStore.mode === CardMode.Static && (
            <Space>
              <Button onClick={onOpenEditingForm}>Edit</Button>
            </Space>
          )}

          {filmsStore.mode === CardMode.Creating && (
            <Space>
              <Button
                type="primary"
                disabled={!filmsStore.canSubmitForm}
                onClick={onSubmit}
              >
                Create
              </Button>
              <Button onClick={onCloseCard}>Cancel</Button>
            </Space>
          )}
        </>
      }
    >
      {filmsStore.mode === CardMode.Static && <FilmStaticCard />}
      {(filmsStore.mode === CardMode.Editing ||
        filmsStore.mode === CardMode.Creating) && (
        <FilmFormCard castForm={castForm} infoForm={infoForm} />
      )}
    </Drawer>
  );
};

export default observer(FilmCard);
