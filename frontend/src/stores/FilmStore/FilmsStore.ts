import { action, makeObservable, observable } from "mobx";
import { filmsApiService } from "apiServices";
import { IFilmDto } from "shared/dtos/FilmDto";
import FilmModel from "./FilmModel";

class FilmsStore {
  constructor() {
    makeObservable(this, {
      films: observable,
      isFetching: observable,
      isCardOpen: observable,

      openFilmCard: action.bound,
      closeFilmCard: action.bound,
    });
  }

  public films: Array<FilmModel> = [];

  public isFetching = false;

  public isCardOpen = false;

  public selectedFilm: FilmModel | null = null;

  public async getAllFilms(): Promise<void> {
    try {
      this.isFetching = true;

      this.films = [];

      const filmDtos = await filmsApiService.getMockFilms();

      this.films = filmDtos.map((f) => new FilmModel(f));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
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

  public async getFilmById(id: number): Promise<void> {
    try {
      this.isFetching = true;
      this.selectedFilm = await filmsApiService.getMockFilmById(id);
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public async openFilmCard(id: number) {
    try {
      await this.getFilmById(id);
      if (this.selectedFilm === null) return;
      this.isCardOpen = true;
    } catch (err) {
      // ignore
    }
  }

  public closeFilmCard() {
    try {
      this.selectedFilm = null;
      this.isCardOpen = false;
    } catch (err) {
      // ignore
    }
  }
}

export default new FilmsStore();
