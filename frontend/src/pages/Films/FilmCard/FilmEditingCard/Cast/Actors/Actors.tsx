import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { cast } from "apiServices/mocks";
import { IProfession } from "shared/dtos/FilmDto";

interface IProps {
  actors: Array<Omit<IProfession, "category">>;
}

const Actors: React.FC<IProps> = ({ actors }) => {
  const [newActorForm, setNewActorForm] = useState<Array<React.ReactElement>>(
    []
  );

  const [idArray, setIdArray] = useState<Array<number>>(
    actors.map((a) => a.id)
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
      <React.Fragment key={actor.id}>
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
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
      </React.Fragment>
    );
  };

  const onAddNewActor = () => {
    setNewActorForm(
      newActorForm?.concat(
        <>{renderActor({ name: "", character: "", id: generateId() })}</>
      )
    );
  };

  return (
    <>
      {actors.map((e) => {
        return <>{renderActor(e)}</>;
      })}
      {newActorForm}
      <Button onClick={onAddNewActor}>Add</Button>
    </>
  );
};

export default Actors;
