export interface INameDto {
  id: number;
  name: string;
  birthYear: string;
  deathYear: string | null;
  avatar: string | null;
}

export interface INameProfession {
  filmId: number;
  title: string;
  category: string;
  character: string | null;
}

export interface IFullNameDto {
  id: number;
  name: string;
  birthYear: string;
  deathYear: string | null;
  avatar: string | null;
  professions: Array<INameProfession>;
}
