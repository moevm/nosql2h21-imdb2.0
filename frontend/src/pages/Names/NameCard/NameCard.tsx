import React from "react";
import { Button, Drawer, Form, Space } from "antd";
import { namesStore } from "stores";
import parseCast from "utils/castParsing";
import { haveErrors } from "utils/isFormHaveErrors";
import { observer } from "mobx-react";
import { CardMode } from "shared/constants/common";
import NameStaticCard from "./NameStaticCard";
import NameFormCard from "./NameFormCard";

const NameCard = () => {
  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();

  const onCloseEditingForm = () => {
    namesStore.setCardMode(CardMode.Static);
    namesStore.setCanSubmit(false);
    namesStore.selectedName?.setNewAvatar(null);
  };

  const onCloseCard = () => {
    namesStore.closeNameCard();
  };

  const onOpenEditingForm = () => {
    namesStore.setCardMode(CardMode.Editing);
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
      // poster: filmsStore.selectedFilm?.newPoster,
      // id: filmsStore.selectedFilm?.id,
    };

    infoForm.submit();
    castForm.submit();

    console.log(result);

    // TODO: submit form and do request
  };

  return (
    <Drawer
      title={namesStore.selectedName.name}
      placement="right"
      onClose={onCloseCard}
      visible={namesStore.mode !== CardMode.Closed}
      width={800}
      extra={
        <>
          {namesStore.mode === CardMode.Editing && (
            <Space>
              <Button
                onClick={onSubmit}
                disabled={!namesStore.canSubmit}
                type="primary"
              >
                Save
              </Button>
              <Button onClick={onCloseEditingForm}>Cancel</Button>
            </Space>
          )}

          {namesStore.mode === CardMode.Static && (
            <Space>
              <Button onClick={onOpenEditingForm}>Edit</Button>
            </Space>
          )}

          {namesStore.mode === CardMode.Creating && (
            <Space>
              <Button
                type="primary"
                disabled={!namesStore.canSubmit}
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
      {namesStore.mode === CardMode.Static && <NameStaticCard />}
      {(namesStore.mode === CardMode.Editing ||
        namesStore.mode === CardMode.Creating) && (
        <NameFormCard castForm={castForm} infoForm={infoForm} />
      )}
    </Drawer>
  );
};

export default observer(NameCard);
