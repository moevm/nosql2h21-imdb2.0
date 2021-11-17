import { ApiPaths } from "shared/constants/ApiPaths";
import { IFilmDto } from "shared/dtos/FilmDto";
import HTTPService from "./HTTPService";

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
    const films = [
      {
        id: 1,
        title: "Film1",
        isAdult: true,
        releaseYear: 2019,
        duration: 132,
        genres: ["drama", "crime", "thriller"],
        poster: null,
      },
      {
        id: 2,
        title: "Film2",
        isAdult: false,
        releaseYear: 2009,
        duration: 172,
        genres: ["comedy", "crime", "historical"],
        poster: null,
      },
      {
        id: 3,
        title: "Film3",
        isAdult: false,
        releaseYear: 2005,
        duration: 140,
        genres: ["thriller", "horror"],
        poster: null,
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => resolve(films), 1000);
    });
  }
}

export default new FilmsApiService();
