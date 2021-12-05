import { ProfessionDto } from "./ProfessionDto";

export class WorkerFullInfoDto {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly birthYear: string,
    readonly deathYear: string,
    readonly image: string,
    readonly professions: ProfessionDto[]
  ) {}
}
