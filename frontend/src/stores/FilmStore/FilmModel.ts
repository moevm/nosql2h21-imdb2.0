import { action, makeObservable, observable } from "mobx";
import { IFilmDto, IFullFilmDto, IProfession } from "shared/dtos/FilmDto";

export enum Professions {
  Actor = "Actor",
  Director = "Director",
  Writer = "Writer",
}

class FilmModel {
  constructor(filmDto: IFilmDto | IFullFilmDto) {
    makeObservable(this, {
      id: observable,
      title: observable,
      duration: observable,
      isAdult: observable,
      genres: observable,
      releaseYear: observable,
      poster: observable,
      professions: observable,

      getNamesByProfession: action,
    });

    this.title = filmDto.title;
    this.id = filmDto.id;
    this.genres = filmDto.genres;
    this.duration = filmDto.duration;
    this.poster = filmDto.poster;
    this.isAdult = filmDto.isAdult;
    this.releaseYear = filmDto.releaseYear;

    if ("professions" in filmDto) {
      this.professions = filmDto.professions;
    }
  }

  public title: string | null = null;

  public id: number | null = null;

  public duration: number | null = null;

  public isAdult: boolean | null = null;

  public genres: Array<string> = [];

  public releaseYear: number | null = null;

  public poster: string | null = null;

  public professions: Array<IProfession> = [];

  public getNamesByProfession(
    profession: Professions
  ): Array<Omit<IProfession, "category">> {
    return this.professions
      .filter((el) => el.category === profession)
      .map((pr) => ({ character: pr.character, name: pr.name }));
  }
}

export default FilmModel;
