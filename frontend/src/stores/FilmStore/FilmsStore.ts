import { makeObservable, observable } from "mobx";
import { filmsApiService } from "apiServices";
import FilmModel from "./FilmModel";
import { IFilmDto } from "../../shared/dtos/FilmDto";

class FilmsStore {
  constructor() {
    makeObservable(this, {
      films: observable,
    });
  }

  public films: Array<FilmModel> = [];

  public async getAllFilms(): Promise<void> {
    try {
      const filmDtos = await filmsApiService.getFilms();

      this.films = filmDtos.map((f) => new FilmModel(f));
    } catch (err) {
      // ignore
    }
  }

  public async postFilm(film: Omit<IFilmDto, "id">): Promise<void> {
    try {
      await filmsApiService.postFilm(film);

      await this.getAllFilms();
    } catch (err) {
      // ignore
    }
  }
}

export default new FilmsStore();
