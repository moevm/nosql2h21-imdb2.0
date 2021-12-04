import React from "react";
import { observer } from "mobx-react";
import { Form, FormInstance, Input, Modal } from "antd";

function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return Promise.reject(new Error("URL not correct!"));
  }

  if (url.protocol === "http:" || url.protocol === "https:")
    return Promise.resolve();
  return Promise.reject(new Error("URL not correct!"));
}

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  defaultValue: { poster: string | null };
  form: FormInstance<{ poster: string | null }>;
}

const ModalMovieForm: React.FC<IProps> = ({
  visible,
  onOk,
  onCancel,
  defaultValue,
  form,
}) => {
  return (
    <Modal
      title="Set image URL"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form name="urlModalForm" initialValues={defaultValue} form={form}>
        <Form.Item
          name="poster"
          rules={[
            {
              validator: (_, value) => isValidHttpUrl(value),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(ModalMovieForm);
