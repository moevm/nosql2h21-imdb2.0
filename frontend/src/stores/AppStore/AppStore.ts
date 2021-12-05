import { action, makeObservable, observable } from "mobx";
import { Professions } from "shared/constants/professions";
import { filmsStore, namesStore } from "stores/index";
import NameModel from "../NameStore/NameModel";
import FilmModel from "../FilmStore/FilmModel";

class AppStore {
  constructor() {
    makeObservable(this, {
      names: observable,
      films: observable,
      isFetching: observable,

      initializeApp: action,
      addFilm: action,
      addName: action,
    });
  }

  public names: Array<Pick<NameModel, "name" | "id">> = [];

  public films: Array<Pick<FilmModel, "title" | "id">> = [];

  public isFetching = false;

  readonly ProfessionArray: Array<Professions> = Object.entries(
    Professions
  ).map(([value]) => value as Professions);

  readonly genres = [
    "drama",
    "crime",
    "thriller",
    "comedy",
    "historical",
    "horror",
  ];

  public async initializeApp(): Promise<void> {
    try {
      this.isFetching = true;

      this.films = (
        filmsStore.films.length > 0
          ? filmsStore.films
          : await filmsStore.getAllFilms()
      ).map((f) => ({
        title: f.title,
        id: f.id,
      }));

      this.names = (
        namesStore.names.length > 0
          ? namesStore.names
          : await namesStore.getAllNames()
      ).map((n) => ({
        name: n.name,
        id: n.id,
      }));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public addFilm(film: FilmModel): void {
    this.films = [...this.films, { title: film.title, id: film.id }];
  }

  public addName(name: NameModel): void {
    this.names = [...this.names, { name: name.name, id: name.id }];
  }
}

export default new AppStore();
