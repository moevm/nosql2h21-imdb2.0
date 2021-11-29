import React from "react";
import { Divider, Form, FormInstance, Select } from "antd";

import {
  ProfessionArray,
  Professions,
  ProfessionsList,
} from "stores/FilmStore/FilmModel";
import { cast } from "apiServices/mocks";
import Actors from "./Actors";

interface IProps {
  professions: ProfessionsList;
  castForm: FormInstance;
}

const Cast: React.FC<IProps> = ({ professions, castForm }) => {
  const renderCast = () => {
    return (
      <>
        {ProfessionArray.map((e) => {
          if (e === Professions.Actor) return null;
          return (
            <Form.Item
              key={e}
              name={e}
              label={e}
              rules={[
                {
                  required: true,
                  message: `Pls write ${e}`,
                },
              ]}
              initialValue={professions[e].map((p) => p.id)}
            >
              <Select
                showSearch
                mode="multiple"
                placeholder={e}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {cast.map((d) => {
                  return (
                    <Select.Option value={d.id} key={d.id}>
                      {d.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        })}
      </>
    );
  };

  return (
    <Form name="cast" form={castForm}>
      {renderCast()}
      <Divider />
      Actors:
      <p />
      <Actors actors={professions.Actor} />
    </Form>
  );
};

export default Cast;
