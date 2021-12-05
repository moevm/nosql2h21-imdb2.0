export interface IFilmDto {
  _id: string;
  title: string;
  isAdult: boolean;
  releaseYear: string;
  duration: number;
  genres: Array<string>;
  poster: string;
}

export interface IFilmProfession {
  workerId: number;
  name: string;
  category: string;
  character: string | null;
}

export interface IFullFilmDto extends IFilmDto {
  crew: Array<IFilmProfession>;
}
