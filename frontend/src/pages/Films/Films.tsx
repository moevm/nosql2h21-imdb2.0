import React, { useEffect } from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Button, Table, Tag } from "antd";
import FilmModel from "../../stores/FilmStore/FilmModel";
import FilmCard from "./FilmCard";
import styles from "./Films.module.scss";

const Films = () => {
  useEffect(() => {
    filmsStore.getAllFilms();
  }, []);

  const onOpenFilmCard = (record: FilmModel) => {
    if (record.id !== null) filmsStore.openFilmCard(record.id);
  };

  const onOpenNewFilmCard = () => {
    filmsStore.openFilmCard();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: FilmModel) => (
        <a onClick={() => onOpenFilmCard(record)}>{text}</a>
      ),
    },
    {
      title: "Certificate",
      dataIndex: "isAdult",
      key: "isAdult",
    },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
    },
    {
      title: "Runtime",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration - hours * 60;

        return `${hours}${hours ? " hr " : ""}${minutes}${
          minutes ? " min" : ""
        }`;
      },
    },
    {
      title: (
        <div className={styles.addButtonWrapper}>
          <span>Genres</span>{" "}
          <Button type={"primary"} onClick={onOpenNewFilmCard}>
            Add movie
          </Button>
        </div>
      ),
      key: "henres",
      dataIndex: "genres",
      render: (genres: Array<string>) => (
        <>
          {genres.map((genre) => (
            <Tag key={genre}>{genre}</Tag>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filmsStore.films}
        loading={filmsStore.isFetching}
      />
      <FilmCard />
    </>
  );
};

export default observer(Films);
