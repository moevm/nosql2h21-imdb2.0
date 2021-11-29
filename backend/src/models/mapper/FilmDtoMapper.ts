import { FilmModelType } from "../mongoose/FilmModel";
import { FilmShortInfoDto } from "../dto/FilmShortInfoDto";
import { FilmsCrewModelType } from "../mongoose/FilmsCrewModel";
import { FilmFullInfoDto } from "../dto/FilmFullInfoDto";
import { FilmWorkerDto } from "../dto/FilmWorkerDto";

class FilmDtoMapper {
  public mapToShortFilmInfoDto(film: FilmModelType): FilmShortInfoDto {
    return new FilmShortInfoDto(
      film._id,
      film.title,
      film.isAdult,
      film.releaseYear,
      film.duration,
      film.genres,
      film.poster
    );
  }

  public mapToFullFilmInfoDto(
    film: FilmModelType,
    crew: FilmWorkerDto[]
  ): FilmFullInfoDto {
    return new FilmFullInfoDto(
      film._id,
      film.title,
      film.isAdult,
      film.releaseYear,
      film.duration,
      film.genres,
      film.poster,
      crew
    );
  }
}

export const filmDtoMapper = new FilmDtoMapper();
