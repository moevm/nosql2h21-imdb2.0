import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto, IFullFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";
import { getMockFilm, films } from "./mocks";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Films);
  }

  private isMock = process.env.NODE_ENV === "development";

  public updateFilm(film: IFullFilmDto): Promise<IFullFilmDto> {
    return this.PUT("", film);
  }

  public postFilm(film: Omit<IFilmDto, "_id">): Promise<IFilmDto> {
    return this.POST("", film);
  }

  public getFilms(): Promise<Array<IFilmDto>> {
    return this.GET("overview/");
  }

  public getMockFilms(): Promise<Array<IFilmDto>> {
    if (!this.isMock) return this.GET("");

    const mockFilms = films;

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilms), 1000);
    });
  }

  public getMockFilmById(id: string): Promise<IFullFilmDto> {
    // TODO: add real request - film by id
    if (!this.isMock) return this.GET("");
    const mockFilm = getMockFilm(id);

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilm), 1000);
    });
  }

  public getFilmById(id: string): Promise<IFullFilmDto> {
    return this.GET(`${id}`);
  }
}

export default new FilmsApiService();
