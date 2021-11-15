import { makeObservable, observable } from "mobx";
import { IFilmDto } from "shared/dtos/FilmDto";

class FilmModel {
  constructor(filmDto: IFilmDto) {
    makeObservable(this, {
      id: observable,
      title: observable,
      duration: observable,
      isAdult: observable,
      genres: observable,
      releaseYear: observable,
      poster: observable,
    });

    this.title = filmDto.title;
    this.id = filmDto.id;
    this.genres = filmDto.genres;
    this.duration = filmDto.duration;
    this.poster = filmDto.poster;
    this.isAdult = filmDto.isAdult;
    this.releaseYear = filmDto.releaseYear;
  }

  public title: string | null = null;

  public id: number | null = null;

  public duration: number | null = null;

  public isAdult: boolean | null = null;

  public genres: Array<string> = [];

  public releaseYear: number | null = null;

  public poster: string | null = null;
}

export default FilmModel;
