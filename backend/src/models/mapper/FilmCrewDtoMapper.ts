import { FilmsCrewModelType } from "../mongoose/FilmsCrewModel";
import { FilmWorkerDto } from "../dto/FilmWorkerDto";

class FilmCrewDtoMapper {
  public mapToFilmCrewDto(filmCrew: FilmsCrewModelType): FilmWorkerDto {
    return new FilmWorkerDto(
      filmCrew.filmId,
      filmCrew.workerId,
      filmCrew.category,
      filmCrew.characters
    );
  }
}

export const filmCrewDtoMapper = new FilmCrewDtoMapper();
