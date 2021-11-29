import { WorkersModelType } from "../mongoose/WorkersModel";
import { WorkerDto } from "../dto/WorkerDto";

class WorkerDtoMapper {
  public mapToWorkerDto(worker: WorkersModelType): WorkerDto {
    return new WorkerDto(
      worker._id,
      worker.name,
      worker.birthYear,
      worker.deathYear,
      worker.image
    );
  }
}

export const workerDtoMapper = new WorkerDtoMapper();
