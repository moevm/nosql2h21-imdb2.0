import { WorkersMongoCollection } from "../models/mongoose/WorkersModel";
import { WorkerDto } from "../models/dto/WorkerDto";
import { workerDtoMapper } from "../models/mapper/WorkerDtoMapper";

class WorkersService {
  public async getWorkers(): Promise<WorkerDto[]> {
    const workers = await WorkersMongoCollection.find();

    return workers.map((w) => workerDtoMapper.mapToWorkerDto(w));
  }

  public async getWorkerById(id: String): Promise<WorkerDto> {
    const film = await WorkersMongoCollection.findById(id);

    if (film == null) {
      throw new Error(`No film with id = ${id}`);
    }

    return workerDtoMapper.mapToWorkerDto(film);
  }

  public async postWorker(newFilm: Omit<WorkerDto, "id">): Promise<WorkerDto> {
    const postedFilm = await WorkersMongoCollection.insertMany([newFilm]);

    return workerDtoMapper.mapToWorkerDto(postedFilm[0]);
  }

  public async updateWorker(film: WorkerDto): Promise<WorkerDto> {
    const updatedFilm: any = await WorkersMongoCollection.updateOne(
      { _id: film._id },
      film
    );

    return updatedFilm;
  }
}

export const workersService = new WorkersService();
