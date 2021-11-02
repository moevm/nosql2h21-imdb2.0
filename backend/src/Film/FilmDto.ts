import { FilmModelType } from "Film/FilmModel";

export interface IFilmDto {
  filmId: string;
  title: string;
  isAdult: boolean;
  releaseYear: string;
  duration: number;
  genres: [string];
  poster: string;
}

export class FilmDto implements IFilmDto {
  constructor(model: FilmModelType) {
    this.filmId = model.filmId;
    this.title = model.title;
    this.isAdult = model.isAdult;
    this.releaseYear = model.releaseYear;
    this.duration = model.duration;
    this.genres = model.genres;
    this.poster = model.poster;
  }

  filmId: string;

  title: string;

  isAdult: boolean;

  releaseYear: string;

  duration: number;

  genres: [string];

  poster: string;
}
