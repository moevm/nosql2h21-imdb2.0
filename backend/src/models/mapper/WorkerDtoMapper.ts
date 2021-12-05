import { WorkersModelType } from "../mongoose/WorkersModel";
import { WorkerShortInfoDto } from "../dto/WorkerShortInfoDto";
import { ProfessionDto } from "../dto/ProfessionDto";
import { WorkerFullInfoDto } from "../dto/WorkerFullInfoDto";

class WorkerDtoMapper {
  public mapToWorkerDto(worker: WorkersModelType): WorkerShortInfoDto {
    return new WorkerShortInfoDto(
      worker._id,
      worker.name,
      worker.birthYear,
      worker.deathYear,
      worker.image
    );
  }

  public mapToWorkerFullInfoDto(
    worker: WorkersModelType,
    professions: ProfessionDto[]
  ) {
    return new WorkerFullInfoDto(
      worker._id,
      worker.name,
      worker.birthYear,
      worker.deathYear,
      worker.image,
      professions
    );
  }

  public mapWorkerFullInfoToShortInfoDto(
    workerFullInfo: WorkerFullInfoDto
  ): WorkerShortInfoDto {
    return new WorkerShortInfoDto(
      workerFullInfo._id,
      workerFullInfo.name,
      workerFullInfo.birthYear,
      workerFullInfo.deathYear,
      workerFullInfo.image
    );
  }
}

export const workerDtoMapper = new WorkerDtoMapper();
