export class FilmShortInfoDto {
  constructor(
    readonly _id: string,
    readonly title: string,
    readonly isAdult: boolean,
    readonly releaseYear: string,
    readonly duration: number,
    readonly genres: [string],
    readonly poster: string
  ) {}
}
