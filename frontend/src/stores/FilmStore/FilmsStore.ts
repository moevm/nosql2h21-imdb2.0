import { action, makeObservable, observable } from "mobx";
import { filmsApiService } from "apiServices";
import { IFullFilmDto } from "shared/dtos/FilmDto";
import { CardMode } from "shared/constants/common";
import FilmModel from "./FilmModel";

class FilmsStore {
  constructor() {
    makeObservable(this, {
      films: observable,
      isFetching: observable,
      mode: observable,
      selectedFilm: observable,
      canSubmitForm: observable,
      isImageFormOpen: observable,

      setIsImageFormOpen: action.bound,
      openFilmCard: action.bound,
      closeFilmCard: action.bound,
      setMode: action.bound,
      setCanSubmitForm: action.bound,
    });
  }

  public films: Array<FilmModel> = [];

  public isFetching = false;

  public mode = CardMode.Closed;

  public isImageFormOpen = false;

  public canSubmitForm = false;

  public selectedFilm: FilmModel = new FilmModel();

  public async getAllFilms(): Promise<void> {
    try {
      this.isFetching = true;

      this.films = [];

      const filmDtos = await filmsApiService.getFilms();

      this.films = filmDtos.map((f) => new FilmModel(f));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public async postFilm(film: Omit<IFullFilmDto, "_id">): Promise<void> {
    try {
      await filmsApiService.postFilm(film);

      await this.getAllFilms();
    } catch (err) {
      // ignore
    }
  }

  public async updateFilm(film: IFullFilmDto): Promise<void> {
    try {
      await filmsApiService.updateFilm(film);

      await this.getAllFilms();
    } catch (err) {
      // ignore
    }
  }

  public async getFilmById(id: string): Promise<void> {
    try {
      this.isFetching = true;
      this.selectedFilm = new FilmModel(await filmsApiService.getFilmById(id));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public async openFilmCard(id?: string) {
    if (id === undefined) {
      this.mode = CardMode.Creating;
      return;
    }

    try {
      await this.getFilmById(id);
      this.mode = CardMode.Static;
    } catch (err) {
      // ignore
    }
  }

  public closeFilmCard() {
    try {
      this.selectedFilm = new FilmModel();
      this.mode = CardMode.Closed;
    } catch (err) {
      // ignore
    }
  }

  public setMode(mode: CardMode) {
    this.mode = mode;
  }

  public setCanSubmitForm(canSubmit: boolean) {
    this.canSubmitForm = canSubmit;
  }

  public setIsImageFormOpen(isImageFormOpen: boolean) {
    this.isImageFormOpen = isImageFormOpen;
  }
}

export default new FilmsStore();
