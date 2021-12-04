import React from "react";

import { Button, Drawer, Form, Space } from "antd";
import { filmsStore } from "stores";
import parseCast from "utils/castParsing";
import { haveErrors } from "utils/isFormHaveErrors";
import { observer } from "mobx-react";
import FilmEditingCard from "./FilmEditingCard/FilmEditingCard";
import FilmStaticCard from "./FilmStaticCard";

const FilmCard = () => {
  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();

  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const onCloseEditingForm = () => {
    filmsStore.setEditingMode(false);
    filmsStore.setCanSubmitForm(false);
    filmsStore.selectedFilm?.setNewPoster(null);
    infoForm.resetFields();
    castForm.resetFields();
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
      onClose={filmsStore.closeFilmCard}
      visible={filmsStore.isCardOpen}
      width={800}
      extra={
        <>
          {filmsStore.isEditing ? (
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
          ) : (
            <Space>
              <Button onClick={() => filmsStore.setEditingMode(true)}>
                Edit
              </Button>
            </Space>
          )}
        </>
      }
    >
      {filmsStore.isEditing ? (
        <FilmEditingCard castForm={castForm} infoForm={infoForm} />
      ) : (
        <FilmStaticCard />
      )}
    </Drawer>
  );
};

export default observer(FilmCard);
