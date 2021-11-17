export interface IFilmDto {
  id: number;
  title: string;
  isAdult: boolean;
  releaseYear: number;
  duration: number;
  genres: Array<string>;
  poster: string | null;
}

export interface IProfession {
  movie: string;
  category: string;
  character: string | null;
}

export interface IFullFilmDto {
  id: number;
  title: string;
  isAdult: boolean;
  releaseYear: number;
  duration: number;
  genres: Array<string>;
  poster: string | null;
  professions: Array<IProfession>;
}
