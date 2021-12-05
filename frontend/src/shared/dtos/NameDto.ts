export interface INameDto {
  id: string;
  name: string;
  birthYear: string;
  deathYear: string | null;
  avatar: string | null;
}

export interface INameProfession {
  filmId: string;
  title: string;
  category: string;
  character: string | null;
}

export interface IFullNameDto extends INameDto {
  professions: Array<INameProfession>;
}
