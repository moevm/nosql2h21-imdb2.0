import mongoose from "mongoose";
import { WorkersMongoCollection } from "../models/mongoose/WorkersModel";
import { WorkerShortInfoDto } from "../models/dto/WorkerShortInfoDto";
import { workerDtoMapper } from "../models/mapper/WorkerDtoMapper";
import {
  FilmsCrewMongoCollection,
  IFilmCrew,
} from "../models/mongoose/FilmsCrewModel";
import { FilmsMongoCollection } from "../models/mongoose/FilmModel";
import { FilmWorkerDto } from "../models/dto/FilmWorkerDto";
import { ProfessionDto } from "../models/dto/ProfessionDto";
import { WorkerFullInfoDto } from "../models/dto/WorkerFullInfoDto";

class WorkersService {
  public async getWorkers(): Promise<WorkerShortInfoDto[]> {
    const workers = await WorkersMongoCollection.find();

    return workers.map((w) => workerDtoMapper.mapToWorkerDto(w));
  }

  public async getWorkerById(id: string): Promise<WorkerFullInfoDto> {
    const objId = mongoose.Types.ObjectId(id);

    const worker = await WorkersMongoCollection.findById(objId);

    if (worker == null) {
      throw new Error(`No worker with id = ${id}`);
    }

    const crewData = await FilmsCrewMongoCollection.find({
      workerId: objId,
    });

    const castedFilmsData = (
      await Promise.all(
        crewData.map(async (data) => {
          const filmInfo = await FilmsMongoCollection.findById(data.filmId);

          if (filmInfo === null) return null;

          return new ProfessionDto(
            filmInfo._id,
            filmInfo.title,
            data.category,
            data.characters
          );
        })
      )
    ).filter((profession) => profession !== null) as ProfessionDto[];

    return workerDtoMapper.mapToWorkerFullInfoDto(worker, castedFilmsData);
  }

  public async postWorker(
    newFilm: Omit<WorkerShortInfoDto, "id">
  ): Promise<WorkerShortInfoDto> {
    const postedFilm = await WorkersMongoCollection.insertMany([newFilm]);

    return workerDtoMapper.mapToWorkerDto(postedFilm[0]);
  }

  public async updateWorker(
    worker: WorkerFullInfoDto
  ): Promise<WorkerShortInfoDto> {
    const workerData = workerDtoMapper.mapWorkerFullInfoToShortInfoDto(worker);

    const updatedWorker = await WorkersMongoCollection.findOneAndUpdate(
      { _id: worker._id },
      workerData,
      { new: true }
    );

    if (updatedWorker === null) {
      throw new Error(`No worker with id = ${worker._id}`);
    }

    const crewData = worker.professions.map((filmData) => {
      return <IFilmCrew>{
        filmId: filmData.filmId,
        workerId: workerData._id,
        category: filmData.profession,
        characters: filmData.characters,
      };
    });

    await FilmsCrewMongoCollection.deleteMany({
      workerId: workerData._id,
    });

    await FilmsCrewMongoCollection.insertMany(crewData);

    return workerDtoMapper.mapToWorkerFullInfoDto(
      updatedWorker,
      worker.professions
    );
  }
}

export const workersService = new WorkersService();
