import React from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import shiningPoster from "static/test/shiningPoster.png";
import { ProfessionArray, Professions } from "stores/FilmStore/FilmModel";
import { toJS } from "mobx";
import { cast, genres } from "apiServices/mocks";
import filmsToFormFilms from "utils/filmsToFormFilms";
import styles from "./FilmEditingCard.module.scss";

const FilmEditingCard = () => {
  if (filmsStore.selectedFilm === null) {
    return null;
  }

  const films = filmsToFormFilms(toJS(filmsStore.selectedFilm));

  const renderCast = () => {
    return (
      <>
        {ProfessionArray.map((e) => {
          if (e === Professions.Actor) return null;

          return (
            <>
              <Divider />
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
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder={e}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {cast[e].map((d) => {
                    return (
                      <Select.Option value={d} key={d}>
                        {d}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </>
          );
        })}
      </>
    );
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
          <Button>Save</Button>
          <Button onClick={() => filmsStore.setEditingMode(false)}>
            Cancel
          </Button>
          <Button danger>Delete</Button>
        </Space>
      }
    >
      <Form initialValues={films}>
        <Row>
          <Col span={12}>
            <img
              src={shiningPoster}
              alt="poster"
              className={styles.imageWrapper}
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
              rules={[{ required: true, message: "Please enter certificate!" }]}
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

        {renderCast()}

        <Divider />

        <Row gutter={[8, 8]}>
          {films.Actor.map((e) => {
            return (
              <React.Fragment key={e.name}>
                <Col span={12}>
                  <Select
                    showSearch
                    placeholder="Actor"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    defaultValue={e.name}
                  >
                    {cast.Actor.map((a) => {
                      return (
                        <Select.Option value={a.name} key={a.name}>
                          {a.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={12}>
                  <Input
                    placeholder="Character"
                    defaultValue={e.character || ""}
                  />
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      </Form>
    </Drawer>
  );
};

export default observer(FilmEditingCard);
