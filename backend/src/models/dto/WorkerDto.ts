export class WorkerDto {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly birthYear: string,
    readonly deathYear: string,
    readonly image: string
  ) {}
}
