import React from "react";

import { Button, Drawer, Form, Space } from "antd";
import { filmsStore } from "stores";
import parseCast from "utils/castParsing";
import { haveErrors } from "utils/isFormHaveErrors";
import { observer } from "mobx-react";
import { CardMode } from "stores/FilmStore/FilmsStore";
import FilmEditingCard from "./FilmEditingCard/FilmEditingCard";
import FilmStaticCard from "./FilmStaticCard";

const FilmCard = () => {
  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();

  const onCloseEditingForm = () => {
    filmsStore.setEditingMode(CardMode.Static);
    filmsStore.setCanSubmitForm(false);
    filmsStore.selectedFilm?.setNewPoster(null);
  };

  const onCloseCard = () => {
    filmsStore.closeFilmCard();
  };

  const onOpenEditingForm = () => {
    filmsStore.setEditingMode(CardMode.Editing);
  };

  const onSubmit = () => {
    if (haveErrors(castForm) || haveErrors(infoForm)) {
      return;
    }

    const cast = castForm.getFieldsValue();
    const professions = parseCast(cast);
    const movieInfo = infoForm.getFieldsValue();
    const result = {
      ...movieInfo,
      professions: [...professions],
      poster: filmsStore.selectedFilm?.newPoster,
      id: filmsStore.selectedFilm?.id,
    };

    infoForm.submit();
    castForm.submit();
    console.log(result);

    // TODO: submit form and do request
  };

  return (
    <Drawer
      title={filmsStore.selectedFilm.title}
      placement="right"
      onClose={onCloseCard}
      visible={filmsStore.isCardOpen}
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
              <Button type="primary">Create</Button>
              <Button>Cancel</Button>
            </Space>
          )}
        </>
      }
    >
      {filmsStore.mode === CardMode.Static && <FilmStaticCard />}
      {filmsStore.mode === CardMode.Editing && (
        <FilmEditingCard castForm={castForm} infoForm={infoForm} />
      )}
    </Drawer>
  );
};

export default observer(FilmCard);
