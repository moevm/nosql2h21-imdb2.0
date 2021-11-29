export class FilmWorkerDto {
  constructor(
    readonly workerId: string,
    readonly name: string,
    readonly category: string,
    readonly character: string
  ) {}
}
