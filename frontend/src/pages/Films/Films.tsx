import React, { useEffect } from "react";
import { filmsStore } from "stores";
import { observer } from "mobx-react";
import { Table, Tag } from "antd";
import FilmModel from "../../stores/FilmStore/FilmModel";
import FilmCard from "./FilmCard";

const Films = () => {
  useEffect(() => {
    filmsStore.getAllFilms();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: FilmModel) => (
        <a
          onClick={() => {
            if (record.id !== null) filmsStore.openFilmCard(record.id);
          }}
        >
          {text}
        </a>
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
      title: "Genres",
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
