import { FilmsMongoCollection } from "models/mongoose/FilmModel";
import { FilmShortInfoDto } from "models/dto/FilmShortInfoDto";
import { filmDtoMapper } from "../models/mapper/FilmDtoMapper";
import { FilmFullInfoDto } from "../models/dto/FilmFullInfoDto";
import { FilmsCrewMongoCollection } from "../models/mongoose/FilmsCrewModel";
import { WorkersMongoCollection } from "../models/mongoose/WorkersModel";
import { FilmWorkerDto } from "../models/dto/FilmWorkerDto";

class FilmService {
  public async getFilms(): Promise<FilmShortInfoDto[]> {
    const films = await FilmsMongoCollection.find();

    return films.map((f) => filmDtoMapper.mapToShortFilmInfoDto(f));
  }

  public async getFilmById(id: String): Promise<FilmFullInfoDto> {
    const film = await FilmsMongoCollection.findById(id);

    if (film == null) {
      throw new Error(`No film with id = ${id}`);
    }

    const filmWorkers = await FilmsCrewMongoCollection.find({
      filmId: id,
    });

    const filmCrewInfo = (
      await Promise.all(
        filmWorkers.map(async (worker) => {
          const workerInfo = await WorkersMongoCollection.findById(worker._id);

          if (workerInfo === null) return null;

          return new FilmWorkerDto(
            worker._id,
            workerInfo.name,
            worker.category,
            worker.characters
          );
        })
      )
    ).filter((worker) => worker !== null) as FilmWorkerDto[];

    return filmDtoMapper.mapToFullFilmInfoDto(film, filmCrewInfo);
  }

  public async postFilm(
    newFilm: Omit<FilmShortInfoDto, "_id">
  ): Promise<FilmShortInfoDto> {
    const postedFilm = await FilmsMongoCollection.insertMany([newFilm]);

    return filmDtoMapper.mapToShortFilmInfoDto(postedFilm[0]);
  }

  public async updateFilm(film: FilmShortInfoDto): Promise<FilmShortInfoDto> {
    const updatedFilm: any = await FilmsMongoCollection.updateOne(
      { _id: film._id },
      film
    );

    return updatedFilm;
  }
}

export const filmService = new FilmService();
