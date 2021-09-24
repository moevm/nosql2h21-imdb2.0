import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Films);
  }

  public getFilms(): Promise<Array<IFilmDto>> {
    return this.GET("");
  }

  public updateFilm(film: IFilmDto): Promise<IFilmDto> {
    return this.PUT("", film);
  }

  public postFilm(film: Omit<IFilmDto, "id">): Promise<IFilmDto> {
    return this.POST("", film);
  }
}

export default new FilmsApiService();
