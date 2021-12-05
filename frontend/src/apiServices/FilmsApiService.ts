import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto, IFullFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";

class FilmsApiService extends HTTPService {
  public constructor() {
    super(ApiPaths.Films);
  }

  public updateFilm(film: IFullFilmDto): Promise<IFullFilmDto> {
    return this.PUT("", film);
  }

  public postFilm(film: Omit<IFilmDto, "_id">): Promise<IFilmDto> {
    return this.POST("", film);
  }

  public getFilms(): Promise<Array<IFilmDto>> {
    return this.GET("overview/");
  }

  public getFilmById(id: string): Promise<IFullFilmDto> {
    return this.GET(`${id}`);
  }
}

export default new FilmsApiService();
