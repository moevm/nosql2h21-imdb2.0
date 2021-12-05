import { action, makeObservable, observable, toJS } from "mobx";
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

      this.films = toJS(await filmsStore.getAllFilms()).map((f) => ({
        title: f.title,
        id: f.id,
      }));

      this.names = toJS(await namesStore.getAllNames()).map((n) => ({
        name: n.name,
        id: n.id,
      }));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public addFilm(film: Pick<FilmModel, "title" | "id">): void {
    this.films.push(film);
  }

  public addName(name: Pick<NameModel, "name" | "id">): void {
    this.names.push(name);
  }
}

export default new AppStore();
