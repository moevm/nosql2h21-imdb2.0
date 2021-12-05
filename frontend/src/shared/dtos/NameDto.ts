export interface INameDto {
  _id: string;
  name: string;
  birthYear: string;
  deathYear: string | null;
  image: string | null;
}

export interface INameProfession {
  filmId: string;
  title: string;
  profession: string;
  characters: string | null;
}

export interface IFullNameDto extends INameDto {
  professions: Array<INameProfession>;
}
