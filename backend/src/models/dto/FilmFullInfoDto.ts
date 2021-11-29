import { FilmWorkerDto } from "./FilmWorkerDto";

export class FilmFullInfoDto {
  constructor(
    readonly _id: string,
    readonly title: string,
    readonly isAdult: boolean,
    readonly releaseYear: string,
    readonly duration: number,
    readonly genres: [string],
    readonly poster: string,
    readonly crew: FilmWorkerDto[]
  ) {}
}
