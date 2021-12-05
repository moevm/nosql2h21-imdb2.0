import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { INameProfession } from "shared/dtos/NameDto";
import { appStore } from "stores";

interface IProps {
  actors?: Array<Omit<INameProfession, "profession">>;
}

const Actors: React.FC<IProps> = ({ actors }) => {
  const [newActorForm, setNewActorForm] = useState<Array<React.ReactElement>>(
    []
  );

  const [idArray, setIdArray] = useState<Array<string>>(
    actors === undefined ? [] : actors.map((a) => a.filmId)
  );

  const generateId = (): string => {
    let newId = "";
    while (true) {
      newId = new Date().getTime().toString();
      if (!idArray.includes(newId)) break;
    }
    setIdArray([...idArray, newId]);
    return newId;
  };

  const renderActor = (actor: {
    title: string;
    characters: string | null;
    filmId: string;
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
              {appStore.films.map((a) => {
                return (
                  <>
                    {a.id && (
                      <Select.Option value={a.id} key={a.id}>
                        {a.title}
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
            initialValue={actor.characters}
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
          {renderActor({ title: "", characters: "", filmId: id })}
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
