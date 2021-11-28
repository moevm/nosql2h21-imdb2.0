import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto, IFullFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";
import { getMockFilm, films } from "./mocks";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Films);
  }

  private isMock = process.env.NODE_ENV === "development";

  public updateFilm(film: IFilmDto): Promise<IFilmDto> {
    return this.PUT("", film);
  }

  public postFilm(film: Omit<IFilmDto, "id">): Promise<IFilmDto> {
    return this.POST("", film);
  }

  // public getFilms(): Promise<Array<IFilmDto>> {
  //   return this.GET("");
  // }

  public getFilms(): Promise<Array<IFilmDto>> {
    if (!this.isMock) return this.GET("");

    const mockFilms = films;

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilms), 1000);
    });
  }

  public getMockFilmById(id: number): Promise<IFullFilmDto> {
    // TODO: add real request - film by id
    if (!this.isMock) return this.GET("");
    const mockFilm = getMockFilm(id);

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilm), 1000);
    });
  }
}

export default new FilmsApiService();
