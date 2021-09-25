import { makeObservable, observable } from "mobx";
import { IFilmDto } from "shared/dtos/FilmDto";

class FilmModel {
  constructor(filmDto: IFilmDto) {
    makeObservable(this, {
      name: observable,
      director: observable,
      releaseDate: observable,
    });

    this.name = filmDto.name;
    this.id = filmDto.id;
    this.director = filmDto.director;
    this.releaseDate = new Date(filmDto.releaseDate);
  }

  public name: string | null = null;

  public id: number | null = null;

  public director: string | null = null;

  public releaseDate: Date | null = null;
}

export default FilmModel;
