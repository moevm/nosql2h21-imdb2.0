import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto, IFullFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";
import { films, getMockFilm } from "./mocks";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Films);
  }

  // for mock requests
  private check = true;

  public getFilms(): Promise<Array<IFilmDto>> {
    return this.GET("");
  }

  public updateFilm(film: IFilmDto): Promise<IFilmDto> {
    return this.PUT("", film);
  }

  public postFilm(film: Omit<IFilmDto, "id">): Promise<IFilmDto> {
    return this.POST("", film);
  }

  public getMockFilms(): Promise<Array<IFilmDto>> {
    this.check = false;
    const mockFilms = films;

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilms), 1000);
    });
  }

  public getMockFilmById(id: number): Promise<IFullFilmDto> {
    this.check = false;
    const mockFilm = getMockFilm(id);

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFilm), 1000);
    });
  }
}

export default new FilmsApiService();
