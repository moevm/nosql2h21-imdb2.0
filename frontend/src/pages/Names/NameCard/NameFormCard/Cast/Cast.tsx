import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Form, FormInstance, Row, Select } from "antd";

import { getDeletedProfessions } from "utils/getDeletedProfessions";
import { NameProfessionsList, Professions } from "shared/constants/professions";
import { appStore } from "stores";
import Actors from "./Actors";

interface IProps {
  professions?: NameProfessionsList;
  castForm: FormInstance;
}

const Cast: React.FC<IProps> = ({ professions, castForm }) => {
  const [selectedProfession, setSelectedProfession] = useState<Professions>();
  const [deletedProfessions, setDeletedProfessions] = useState<Professions[]>(
    getDeletedProfessions(professions)
  );

  useEffect(() => {
    (async () => {
      castForm.resetFields();
      await castForm.validateFields();
    })();
  }, []);

  const onSelectProfessionChange = (value: Professions) => {
    setSelectedProfession(value);
  };

  const renderProfession = (
    profession: Professions,
    initialNames: string[]
  ) => {
    return (
      <Form.Item
        key={profession}
        name={profession}
        label={profession}
        initialValue={initialNames}
      >
        <Select
          showSearch
          mode="multiple"
          placeholder={profession}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {appStore.films.map((d) => {
            return (
              <>
                {d.id && (
                  <Select.Option value={d.id} key={d.id}>
                    {d.title || "No title"}
                  </Select.Option>
                )}
              </>
            );
          })}
        </Select>
      </Form.Item>
    );
  };

  const onAddNewProfession = () => {
    if (selectedProfession === undefined) return;

    setDeletedProfessions(
      deletedProfessions.filter((p) => p !== selectedProfession)
    );
  };

  const renderCast = (): React.ReactNode => {
    return (
      <>
        {appStore.ProfessionArray.map((e) => {
          if (e === Professions.Actor) return null;
          if (deletedProfessions.includes(e)) return null;

          const nameIdArray = professions
            ? professions[e].map((p) => p.filmId)
            : [];

          return renderProfession(e, nameIdArray);
        })}
      </>
    );
  };

  return (
    <Form name="cast" form={castForm}>
      {renderCast()}
      {deletedProfessions.length > 0 && (
        <>
          <Divider />
          <Row>
            <Col span={12}>
              <Select
                onChange={onSelectProfessionChange}
                showSearch
                placeholder={"Select profession"}
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
                {deletedProfessions.map((p) => {
                  return (
                    <Select.Option value={p} key={p}>
                      {p}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col>
              <Button
                onClick={onAddNewProfession}
                disabled={selectedProfession === undefined}
              >
                Add new profession
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Divider />
      Actors:
      <p />
      <Actors actors={professions?.Actor} />
    </Form>
  );
};

export default Cast;
