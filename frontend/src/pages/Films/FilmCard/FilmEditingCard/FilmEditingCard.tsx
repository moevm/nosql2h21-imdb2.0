import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import noImage from "static/no_image.svg";
import { toJS } from "mobx";
import { genres } from "apiServices/mocks";
import filmsToFormFilms from "utils/filmsToFormFilms";
import parseCast from "utils/castParsing";
import styles from "./FilmEditingCard.module.scss";
import Cast from "./Cast";
import ModalMovieForm from "./ModalMovieForm/ModalMovieForm";

const FilmEditingCard = () => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const [films, professions] = filmsToFormFilms(toJS(filmsStore.selectedFilm));

  const [infoForm] = Form.useForm();
  const [castForm] = Form.useForm();
  const [urlForm] = Form.useForm<{ poster: string | null }>();

  const haveErrors = (form: FormInstance) => {
    return form.getFieldsError().find((e) => e.errors.length > 0) !== undefined;
  };

  const onOk = () => {
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
    };

    console.log(result);

    // TODO: submit form and do request
  };

  const openModalUrlForm = () => {
    filmsStore.setIsImageFormOpen(true);
  };

  const closeModalUrlForm = () => {
    filmsStore.setIsImageFormOpen(false);
  };

  const onSetImageUrl = () => {
    if (haveErrors(urlForm)) return;
    filmsStore.selectedFilm?.setNewPoster(urlForm.getFieldsValue().poster);
    filmsStore.setCanSubmitForm(true);
    closeModalUrlForm();
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
          <Button
            onClick={onOk}
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
      }
    >
      <ModalMovieForm
        visible={filmsStore.isImageFormOpen}
        onOk={onSetImageUrl}
        onCancel={closeModalUrlForm}
        defaultValue={{ poster: films.poster }}
        form={urlForm}
      />
      <Form.Provider
        onFormChange={() => {
          if (haveErrors(castForm) || haveErrors(infoForm)) {
            filmsStore.setCanSubmitForm(false);
          } else {
            filmsStore.setCanSubmitForm(true);
          }
        }}
      >
        <Form initialValues={films} form={infoForm}>
          <Row>
            <Col span={12}>
              <img
                src={films.newPoster === null ? noImage : films.newPoster}
                alt="poster"
                className={styles.imageWrapper}
                onClick={openModalUrlForm}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                name="releaseYear"
                hasFeedback
                label="Year"
                rules={[
                  { required: true, message: "Please enter release year!" },
                ]}
              >
                <Input placeholder="Release year" />
              </Form.Item>
              <Form.Item
                name="isAdult"
                label="Certificate"
                rules={[
                  { required: true, message: "Please enter certificate!" },
                ]}
              >
                <Select placeholder="Certificate">
                  <Select.Option value={"18+"}>18+</Select.Option>
                  <Select.Option value={"6+"}>6+</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="genres"
                label="Genres"
                rules={[{ required: true, message: "Please select genres!" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Genres"
                  style={{ width: "100%" }}
                >
                  {genres.map((g) => (
                    <Select.Option value={g} key={g}>
                      {g}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
        </Form>
        <Cast professions={professions} castForm={castForm} />
      </Form.Provider>
    </Drawer>
  );
};

export default observer(FilmEditingCard);
