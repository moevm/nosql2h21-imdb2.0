import { action, makeObservable, observable, toJS } from "mobx";
import { Professions } from "shared/constants/professions";
import { filmsStore } from "stores/index";
import NameModel from "../NameStore/NameModel";
import FilmModel from "../FilmStore/FilmModel";
import { IFullNameDto, INameDto } from "../../shared/dtos/NameDto";

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

  public mockNames: Array<INameDto> = [
    {
      id: "1",
      name: "Jack",
      birthYear: "1994",
      deathYear: null,
      avatar: null,
    },
    {
      id: "2",
      name: "Bob",
      birthYear: "1965",
      deathYear: "2020",
      avatar: null,
    },
    {
      id: "3",
      name: "Teodor",
      birthYear: "1996",
      deathYear: null,
      avatar: null,
    },
    {
      id: "4",
      name: "Steven",
      birthYear: "1994",
      deathYear: null,
      avatar: null,
    },
    {
      id: "5",
      name: "Some",
      birthYear: "1965",
      deathYear: "2020",
      avatar: null,
    },
    {
      id: "6",
      name: "Garry Oldman",
      birthYear: "1996",
      deathYear: null,
      avatar: null,
    },
    {
      id: "7",
      name: "Henry Ford",
      birthYear: "1994",
      deathYear: null,
      avatar: null,
    },
    {
      id: "8",
      name: "check1",
      birthYear: "1965",
      deathYear: "2020",
      avatar: null,
    },
    {
      id: "9",
      name: "check2",
      birthYear: "1996",
      deathYear: null,
      avatar: null,
    },
    {
      id: "10",
      name: "check3",
      birthYear: "1994",
      deathYear: null,
      avatar: null,
    },
    {
      id: "11",
      name: "Lolez",
      birthYear: "1965",
      deathYear: "2020",
      avatar: null,
    },
    {
      id: "12",
      name: "writercheck",
      birthYear: "1996",
      deathYear: null,
      avatar: null,
    },
    {
      id: "13",
      name: "Fake",
      birthYear: "1996",
      deathYear: null,
      avatar: null,
    },
  ];

  private static randomInteger(min: number, max: number): number {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  public getMockName(id: string): IFullNameDto {
    // FIXME: for real data
    const intId = Number(id);

    if (id === undefined || (intId < 1 && intId > 13))
      id = AppStore.randomInteger(1, 13).toString();

    const name = this.mockNames.find((n) => n.id === id);

    return {
      ...name!,
      professions: [
        {
          filmId: "7474303031303230395f5f5f",
          title: "Film1",
          category: "Actor",
          character: "character2",
        },
        {
          filmId: "7474303031303130395f5f5f",
          title: "Film2",
          category: "Actor",
          character: "character3",
        },
        {
          filmId: "7474303031303130395f5f5f",
          title: "Film3",
          category: "Writer",
          character: null,
        },
      ],
    };
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
          ? toJS(filmsStore.films)
          : toJS(await filmsStore.getAllFilms())
      ).map((f) => ({
        title: f.title,
        id: f.id,
      }));

      this.names = this.mockNames.map((n) => ({ name: n.name, id: n.id }));

      // this.names = (
      //   namesStore.names.length > 0
      //     ? namesStore.names
      //     : await namesStore.getAllNames()
      // ).map((n) => ({
      //   name: n.name,
      //   id: n.id,
      // }));
    } catch (err) {
      // ignore
    } finally {
      this.isFetching = false;
    }
  }

  public addFilm(film: FilmModel): void {
    this.films.push({ title: film.title, id: film.id });
  }

  public addName(name: NameModel): void {
    this.names.push({ name: name.name, id: name.id });
  }
}

export default new AppStore();
