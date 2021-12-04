import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { cast } from "apiServices/mocks";
import { IProfession } from "shared/dtos/FilmDto";

interface IProps {
  actors?: Array<Omit<IProfession, "category">>;
}

const Actors: React.FC<IProps> = ({ actors }) => {
  const [newActorForm, setNewActorForm] = useState<Array<React.ReactElement>>(
    []
  );

  const [idArray, setIdArray] = useState<Array<number>>(
    actors === undefined ? [] : actors.map((a) => a.id)
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
    name: string;
    character: string | null;
    id: number;
  }) => {
    return (
      <Row>
        <Col span={12}>
          <Form.Item
            name={`actor_${actor.id}`}
            initialValue={actor.name === "" ? undefined : actor.id}
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
              {cast.map((a) => {
                return (
                  <Select.Option value={a.id} key={a.id}>
                    {a.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`character_${actor.id}`}
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
          {renderActor({ name: "", character: "", id })}
        </React.Fragment>
      )
    );
  };

  return (
    <>
      {actors === undefined
        ? null
        : actors.map((a) => {
            return <React.Fragment key={a.id}>{renderActor(a)}</React.Fragment>;
          })}
      {newActorForm}
      <Button onClick={onAddNewActor}>Add new actor</Button>
    </>
  );
};

export default Actors;
