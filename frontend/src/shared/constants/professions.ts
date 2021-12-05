import { IFilmProfession } from "../dtos/FilmDto";
import { INameProfession } from "../dtos/NameDto";

export enum Professions {
  Director = "Director",
  Writer = "Writer",
  Actor = "Actor",
  Producer = "Producer",
  Composer = "Composer",
}

type FilmProfessionsListWithoutActor = Record<
  Exclude<Professions, Professions.Actor>,
  Array<Omit<IFilmProfession, "category" | "character">>
>;

type NameProfessionsListWithoutActor = Record<
  Exclude<Professions, Professions.Actor>,
  Array<Omit<INameProfession, "category" | "character">>
>;

export type FilmActorType = Record<
  Professions.Actor,
  Array<Omit<IFilmProfession, "category">>
>;

export type NameActorType = Record<
  Professions.Actor,
  Array<Omit<INameProfession, "category">>
>;

export type FilmProfessionsList = FilmProfessionsListWithoutActor &
  FilmActorType;

export type NameProfessionsList = NameProfessionsListWithoutActor &
  NameActorType;

export const filmEmptyProfessionList: FilmProfessionsList = {
  Director: [],
  Writer: [],
  Actor: [],
  Producer: [],
  Composer: [],
};

export const nameEmptyProfessionList: NameProfessionsList = {
  Director: [],
  Writer: [],
  Actor: [],
  Producer: [],
  Composer: [],
};
