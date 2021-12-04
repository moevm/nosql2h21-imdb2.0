import { action, makeObservable, observable } from "mobx";
import { IFilmDto, IFullFilmDto, IProfession } from "shared/dtos/FilmDto";

export enum Professions {
  Director = "Director",
  Writer = "Writer",
  Actor = "Actor",
  Producer = "Producer",
  Composer = "Composer",
}

export const ProfessionArray: Array<Professions> = Object.entries(
  Professions
).map(([value]) => value as Professions);

type ProfessionsListWithoutActor = Record<
  Exclude<Professions, Professions.Actor>,
  Array<Omit<IProfession, "category" | "character">>
>;

export type ActorType = Record<
  Professions.Actor,
  Array<Omit<IProfession, "category">>
>;

export type ProfessionsList = ProfessionsListWithoutActor & ActorType;

export const emptyProfessionList: ProfessionsList = {
  Director: [],
  Writer: [],
  Actor: [],
  Producer: [],
  Composer: [],
};

class FilmModel {
  constructor(filmDto?: IFilmDto | IFullFilmDto) {
    makeObservable(this, {
      id: observable,
      title: observable,
      duration: observable,
      isAdult: observable,
      genres: observable,
      releaseYear: observable,
      poster: observable,
      newPoster: observable,
      professions: observable,

      getNamesByProfession: action,
      setNewPoster: action.bound,
    });

    this.title = filmDto?.title || null;
    this.id = filmDto?.id || null;
    this.genres = filmDto?.genres || [];
    this.duration = filmDto?.duration || null;
    this.poster = filmDto?.poster || null;
    this.newPoster = filmDto?.poster || null;
    this.isAdult = filmDto?.isAdult ? "18+" : "6+";
    this.releaseYear = filmDto?.releaseYear || null;

    if (filmDto !== undefined && "professions" in filmDto) {
      this.professions = filmDto.professions;
    }
  }

  public title: string | null = null;

  public id: number | null = null;

  public duration: number | null = null;

  public isAdult: string | null = null;

  public genres: Array<string> = [];

  public releaseYear: number | null = null;

  public poster: string | null = null;

  public newPoster: string | null = null;

  public professions: Array<IProfession> = [];

  public getNamesByProfession(
    profession: Professions
  ): Array<Omit<IProfession, "category">> {
    return this.professions
      .filter((el) => el.category === profession)
      .map((pr) => ({ character: pr.character, name: pr.name, id: pr.id }));
  }

  public setNewPoster(poster: string | null): void {
    this.newPoster = poster;
  }
}

export default FilmModel;
