import React, { FormEvent, useEffect, useState } from "react";
import filmsStore from "stores/FilmStore/FilmsStore";
import { observer } from "mobx-react";
import { Button, DatePicker, Input, List } from "antd";
import moment, { Moment } from "moment";

function Films() {
  useEffect(() => {
    filmsStore.getAllFilms();
  }, []);

  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    filmsStore.postFilm({ name, director, releaseDate: date.toISOString() });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeDirector = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(event.target.value);
  };
  const onChangeDate = (value: Moment | null, dateString: string) => {
    setDate(new Date(dateString));
  };

  return (
    <>
      <h1>Films</h1>
      <h2>New film</h2>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Title" value={name} onChange={onChangeName} />
        <Input
          placeholder="Director"
          value={director}
          onChange={onChangeDirector}
        />
        <DatePicker onChange={onChangeDate} />
        <Button type="primary" htmlType="submit">
          Add film
        </Button>
      </form>
      <List
        itemLayout="horizontal"
        dataSource={filmsStore.films}
        loading={!filmsStore.films}
        renderItem={(film) => (
          <List.Item key={film.id}>
            <List.Item.Meta title={<b>{film.name} </b>} />
            director: {film.director} <p />
            release date: {moment(film.releaseDate).format("DD/MM/YYYY")}
          </List.Item>
        )}
      />
    </>
  );
}

export default observer(Films);
