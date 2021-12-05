import { action, makeObservable, observable } from "mobx";
import { IFilmDto, IFullFilmDto, IFilmProfession } from "shared/dtos/FilmDto";
import { Professions } from "../../shared/constants/professions";

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
    this.id = filmDto?._id || null;
    this.genres = filmDto?.genres || [];
    this.duration = filmDto?.duration || null;
    this.poster = filmDto?.poster || null;
    this.newPoster = filmDto?.poster || null;
    this.isAdult = filmDto?.isAdult ? "18+" : "6+";
    this.releaseYear = filmDto?.releaseYear || null;

    if (filmDto !== undefined && "crew" in filmDto) {
      this.professions = filmDto.crew;
    }
  }

  public title: string | null = null;

  public id: string | null = null;

  public duration: number | null = null;

  public isAdult: string | null = null;

  public genres: Array<string> = [];

  public releaseYear: string | null = null;

  public poster: string | null = null;

  public newPoster: string | null = null;

  public professions: Array<IFilmProfession> = [];

  public getNamesByProfession(
    profession: Professions
  ): Array<Omit<IFilmProfession, "category">> {
    return this.professions
      .filter((el) => el.category === profession)
      .map((pr) => ({
        character: pr.character,
        name: pr.name,
        workerId: pr.workerId,
      }));
  }

  public setNewPoster(poster: string | null): void {
    this.newPoster = poster;
  }
}

export default FilmModel;
