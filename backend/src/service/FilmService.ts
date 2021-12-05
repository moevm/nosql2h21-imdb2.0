import { FilmsMongoCollection, IFilm } from "models/mongoose/FilmModel";
import { FilmShortInfoDto } from "models/dto/FilmShortInfoDto";
import mongoose from "mongoose";
import { filmDtoMapper } from "../models/mapper/FilmDtoMapper";
import { FilmFullInfoDto } from "../models/dto/FilmFullInfoDto";
import {
  FilmsCrewMongoCollection,
  IFilmCrew,
} from "../models/mongoose/FilmsCrewModel";
import { WorkersMongoCollection } from "../models/mongoose/WorkersModel";
import { FilmWorkerDto } from "../models/dto/FilmWorkerDto";

class FilmService {
  public async getFilms(): Promise<FilmShortInfoDto[]> {
    const films = await FilmsMongoCollection.find();

    return films.map((f) => filmDtoMapper.mapToShortFilmInfoDto(f));
  }

  public async getFilmById(id: string): Promise<FilmFullInfoDto> {
    const objId = mongoose.Types.ObjectId(id);
    const film = await FilmsMongoCollection.findById(objId);

    if (film == null) {
      throw new Error(`No film with id = ${id}`);
    }

    const filmCrewData = await FilmsCrewMongoCollection.find({
      filmId: objId,
    });

    console.log(filmCrewData);

    const filmWorkerInfo = (
      await Promise.all(
        filmCrewData.map(async (data) => {
          const workerInfo = await WorkersMongoCollection.findById(
            data.workerId
          );
          console.log(workerInfo);
          if (workerInfo === null) return null;

          return new FilmWorkerDto(
            data._id,
            workerInfo.name,
            data.category,
            data.characters
          );
        })
      )
    ).filter((worker) => worker !== null) as FilmWorkerDto[];

    return filmDtoMapper.mapToFullFilmInfoDto(film, filmWorkerInfo);
  }

  public async postFilm(
    newFilm: Omit<FilmShortInfoDto, "_id">
  ): Promise<FilmShortInfoDto> {
    const postedFilm = await FilmsMongoCollection.insertMany([newFilm]);

    return filmDtoMapper.mapToShortFilmInfoDto(postedFilm[0]);
  }

  public async updateFilm(film: FilmFullInfoDto): Promise<FilmShortInfoDto> {
    const filmData = filmDtoMapper.mapFullFilmInfoToShortDto(film);

    const updatedFilm = await FilmsMongoCollection.findOneAndUpdate(
      { _id: film._id },
      filmData,
      { new: true }
    );

    if (updatedFilm == null) {
      throw new Error(`No film with id = ${film._id}`);
    }

    const crewData = film.crew.map((workerData) => {
      return <IFilmCrew>{
        filmId: filmData._id,
        workerId: workerData.workerId,
        category: workerData.category,
        characters: workerData.character,
      };
    });

    await FilmsCrewMongoCollection.deleteMany({
      filmId: film._id,
    });

    await FilmsCrewMongoCollection.insertMany(crewData);

    return filmDtoMapper.mapToFullFilmInfoDto(updatedFilm, film.crew);
  }
}

export const filmService = new FilmService();
