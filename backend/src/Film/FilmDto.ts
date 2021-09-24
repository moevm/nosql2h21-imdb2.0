import { FilmModelType } from "Film/FilmModel";

export interface IFilmDto {
  id: number;
  name: string;
  director: string;
  releaseDate: string;
}

class FilmDto implements IFilmDto {
  constructor(model: FilmModelType) {
    this.id = model.id;
    this.name = model.name;
    this.director = model.director;
    this.releaseDate = model.releaseDate;
  }

  id: number;

  name: string;

  director: string;

  releaseDate: string;
}
export default FilmDto;
