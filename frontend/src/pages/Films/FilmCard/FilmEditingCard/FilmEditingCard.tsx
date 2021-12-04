import React, { useEffect } from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Col, Divider, Form, FormInstance, Input, Row, Select } from "antd";
import noImage from "static/no_image.svg";
import { toJS } from "mobx";
import { genres } from "apiServices/mocks";
import filmsToFormFilms from "utils/filmsToFormFilms";
import { haveErrors } from "utils/isFormHaveErrors";
import styles from "./FilmEditingCard.module.scss";
import Cast from "./Cast";
import ModalMovieForm from "./ModalMovieForm/ModalMovieForm";

interface IProps {
  infoForm: FormInstance;
  castForm: FormInstance;
}

const FilmEditingCard: React.FC<IProps> = ({ infoForm, castForm }) => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const [films, professions] = filmsToFormFilms(toJS(filmsStore.selectedFilm));

  const [urlForm] = Form.useForm<{ poster: string | null }>();

  const openModalUrlForm = () => {
    filmsStore.setIsImageFormOpen(true);
  };

  useEffect(() => {
    infoForm.resetFields();
    castForm.resetFields();
  }, []);

  const closeModalUrlForm = () => {
    filmsStore.setIsImageFormOpen(false);
  };

  const checkFormValidation = (): boolean => {
    if (haveErrors(castForm) || haveErrors(infoForm)) {
      filmsStore.setCanSubmitForm(false);
      return false;
    }
    filmsStore.setCanSubmitForm(true);
    return true;
  };

  const onSetImageUrl = () => {
    if (haveErrors(urlForm)) return;
    filmsStore.selectedFilm?.setNewPoster(urlForm.getFieldsValue().poster);

    if (checkFormValidation()) {
      filmsStore.setCanSubmitForm(true);
    }
    closeModalUrlForm();
  };
  return (
    <>
      <ModalMovieForm
        visible={filmsStore.isImageFormOpen}
        onOk={onSetImageUrl}
        onCancel={closeModalUrlForm}
        defaultValue={{ poster: films.poster }}
        form={urlForm}
      />
      <Form.Provider onFormChange={checkFormValidation}>
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
    </>
  );
};

export default observer(FilmEditingCard);
