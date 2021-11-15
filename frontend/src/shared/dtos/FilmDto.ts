export interface IFilmDto {
  id: number;
  title: string;
  isAdult: boolean;
  releaseYear: number;
  duration: number;
  genres: Array<string>;
  poster: string | null;
}
