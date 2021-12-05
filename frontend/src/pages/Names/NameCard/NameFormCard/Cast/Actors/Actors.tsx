import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { INameProfession } from "shared/dtos/NameDto";
import { appStore } from "../../../../../../stores";

interface IProps {
  actors?: Array<Omit<INameProfession, "category">>;
}

const Actors: React.FC<IProps> = ({ actors }) => {
  const [newActorForm, setNewActorForm] = useState<Array<React.ReactElement>>(
    []
  );

  const [idArray, setIdArray] = useState<Array<number>>(
    actors === undefined ? [] : actors.map((a) => a.filmId)
  );

  const generateId = (): number => {
    let newId = 0;
    while (true) {
      newId = new Date().getTime();
      if (!idArray.includes(newId)) break;
    }
    setIdArray([...idArray, newId]);
    return newId;
  };

  const renderActor = (actor: {
    title: string;
    character: string | null;
    filmId: number;
  }) => {
    return (
      <Row>
        <Col span={12}>
          <Form.Item
            name={`actor_${actor.filmId}`}
            initialValue={actor.title === "" ? undefined : actor.filmId}
          >
            <Select
              showSearch
              placeholder="Actor"
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
              {appStore.names.map((a) => {
                return (
                  <>
                    {a.id && (
                      <Select.Option value={a.id} key={a.id}>
                        {a.name}
                      </Select.Option>
                    )}
                  </>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`character_${actor.filmId}`}
            initialValue={actor.character}
          >
            <Input placeholder="Character" />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  const onAddNewActor = () => {
    const id = generateId();

    setNewActorForm(
      newActorForm?.concat(
        <React.Fragment key={id}>
          {renderActor({ title: "", character: "", filmId: id })}
        </React.Fragment>
      )
    );
  };

  return (
    <>
      {actors === undefined
        ? null
        : actors.map((a) => {
            return (
              <React.Fragment key={a.filmId}>{renderActor(a)}</React.Fragment>
            );
          })}
      {newActorForm}
      <Button onClick={onAddNewActor}>Add new actor</Button>
    </>
  );
};

export default Actors;
