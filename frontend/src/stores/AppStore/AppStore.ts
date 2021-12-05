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
      updateFilm: action,
      addName: action,
      updateName: action,
    });
  }

  public names: Array<Pick<NameModel, "name" | "id">> = [];

  public films: Array<Pick<FilmModel, "title" | "id">> = [];

  public isFetching = false;

  readonly ProfessionArray: Array<Professions> = Object.entries(
    Professions
  ).map(([, value]) => value as Professions);

  readonly genres = [
    "Action",
    "Adventure",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
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

  public updateFilm(film: Pick<FilmModel, "title" | "id">): void {
    const updatedFilm = this.films.find((f) => f.id === film.id);
    if (!updatedFilm) return;
    updatedFilm.title = film.title;
  }

  public updateName(name: Pick<NameModel, "name" | "id">): void {
    const updatedName = this.names.find((n) => n.id === name.id);
    if (!updatedName) return;
    updatedName.name = name.name;
  }
}

export default new AppStore();
