import React from "react";

import { Button, Drawer, Form, Space } from "antd";
import { filmsStore } from "stores";
import parseCast from "utils/castParsing";
import { haveErrors } from "utils/isFormHaveErrors";
import FilmEditingCard from "./FilmEditingCard/FilmEditingCard";
import FilmStaticCard from "./FilmStaticCard";

interface IProps {
  isEditable: boolean;
}

const FilmCard: React.FC<IProps> = ({ isEditable }) => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();

  const onSubmit = () => {
    if (haveErrors(castForm) || haveErrors(infoForm)) {
      return;
    }

    const cast = castForm.getFieldsValue();
    const answer = parseCast(cast);
    const movieInfo = infoForm.getFieldsValue();
    const result = {
      ...movieInfo,
      professions: [...answer],
      poster: filmsStore.selectedFilm?.newPoster,
      id: filmsStore.selectedFilm?.id,
    };

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
              <Button
                onClick={() => {
                  filmsStore.setEditingMode(false);
                  filmsStore.selectedFilm?.setNewPoster(null);
                }}
              >
                Cancel
              </Button>
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
      {isEditable ? (
        <FilmEditingCard castForm={castForm} infoForm={infoForm} />
      ) : (
        <FilmStaticCard />
      )}
    </Drawer>
  );
};

export default FilmCard;
