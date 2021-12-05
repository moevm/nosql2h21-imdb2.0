import React, { useEffect } from "react";
import { namesStore } from "stores";
import { observer } from "mobx-react";
import { Col, Divider, Form, FormInstance, Input, Row } from "antd";
import noImage from "static/no_image.svg";
import { toJS } from "mobx";
import { haveErrors } from "utils/isFormHaveErrors";
import { CardMode } from "shared/constants/common";
import namesToFormNames from "utils/namesToFormNames";
import { NameProfessionsList } from "shared/constants/professions";
import NameModel from "stores/NameStore/NameModel";
import styles from "./NameFormCard.module.scss";
import Cast from "./Cast";
import ModalMovieForm from "./ModalMovieForm/ModalMovieForm";

interface IProps {
  infoForm: FormInstance;
  castForm: FormInstance;
}

const NameFormCard: React.FC<IProps> = ({ infoForm, castForm }) => {
  let names:
    | Omit<NameModel, "professions" | "getNamesByProfession" | "setNewAvatar">
    | undefined;

  let professions: NameProfessionsList | undefined;

  if (namesStore.mode === CardMode.Editing) {
    [names, professions] = namesToFormNames(toJS(namesStore.selectedName));
  }

  const [urlForm] = Form.useForm<{ poster: string | null }>();

  const openModalUrlForm = () => {
    namesStore.setIsModalUrlEditFormOpen(true);
  };

  useEffect(() => {
    (async () => {
      infoForm.resetFields();
      await infoForm.validateFields();
    })();
  }, []);

  const closeModalUrlForm = () => {
    namesStore.setIsModalUrlEditFormOpen(false);
  };

  const checkFormValidation = (): boolean => {
    if (haveErrors(castForm) || haveErrors(infoForm)) {
      namesStore.setCanSubmit(false);
      return false;
    }
    namesStore.setCanSubmit(true);
    return true;
  };

  const onSetImageUrl = () => {
    if (haveErrors(urlForm)) return;
    namesStore.selectedName?.setNewAvatar(urlForm.getFieldsValue().poster);

    if (checkFormValidation()) {
      namesStore.setCanSubmit(true);
    }
    closeModalUrlForm();
  };
  return (
    <>
      <ModalMovieForm
        visible={namesStore.isModalUrlEditFormOpen}
        onOk={onSetImageUrl}
        onCancel={closeModalUrlForm}
        defaultValue={{ poster: names?.avatar || null }}
        form={urlForm}
      />
      <Form.Provider onFormChange={checkFormValidation}>
        <Form initialValues={names} form={infoForm}>
          <Row>
            <Col span={12}>
              <img
                src={
                  namesStore.selectedName.newAvatar === null
                    ? noImage
                    : namesStore.selectedName.newAvatar
                }
                alt="poster"
                className={styles.imageWrapper}
                onClick={openModalUrlForm}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                name="birthYear"
                hasFeedback
                label="Birth year"
                rules={[
                  { required: true, message: "Please enter birth year!" },
                ]}
              >
                <Input placeholder="Birth year" />
              </Form.Item>

              <Form.Item name="deathYear" hasFeedback label="Death year">
                <Input placeholder="Death year" />
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

export default observer(NameFormCard);
