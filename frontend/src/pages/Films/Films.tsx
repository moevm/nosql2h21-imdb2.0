import React, { FormEvent, useEffect, useState } from "react";
import filmsStore from "stores/FilmStore/FilmsStore";
import { observer } from "mobx-react";

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
  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  // eslint-disable-next-line no-console
  console.log(date.toISOString());

  return (
    <>
      <form onSubmit={handleSubmit}>
        New film <br />
        name :
        <input required value={name} onChange={onChangeName} /> <br />
        director :
        <input required value={director} onChange={onChangeDirector} /> <br />
        date :
        <input
          required
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={onChangeDate}
        />
        <br />
        <input type="submit" value="Add film" />
      </form>
      <br />
      All Films <br />
      {filmsStore.films.length > 0 ? (
        filmsStore.films.map((f) => (
          <>
            name : {f?.name}
            <br />
            director : {f?.director}
            <br />
            date : {f.releaseDate?.toDateString()}
            <br />
          </>
        ))
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export default observer(Films);
