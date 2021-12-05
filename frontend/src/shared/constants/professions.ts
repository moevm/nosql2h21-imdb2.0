import { IFilmProfession } from "../dtos/FilmDto";
import { INameProfession } from "../dtos/NameDto";

export enum Professions {
  ArchiveFootage = "archive_footage",
  Cinematographer = "cinematographer",
  Composer = "composer",
  Editor = "editor",
  ProductionDesigner = "production_designer",
  Self = "self",
  Writer = "writer",
  Director = "director",
  Actor = "actor",
  Producer = "producer",
}

type FilmProfessionsListWithoutActor = Record<
  Exclude<Professions, Professions.Actor>,
  Array<Omit<IFilmProfession, "category" | "character">>
>;

type NameProfessionsListWithoutActor = Record<
  Exclude<Professions, Professions.Actor>,
  Array<Omit<INameProfession, "profession" | "characters">>
>;

export type FilmActorType = Record<
  Professions.Actor,
  Array<Omit<IFilmProfession, "category">>
>;

export type NameActorType = Record<
  Professions.Actor,
  Array<Omit<INameProfession, "profession">>
>;

export type FilmProfessionsList = FilmProfessionsListWithoutActor &
  FilmActorType;

export type NameProfessionsList = NameProfessionsListWithoutActor &
  NameActorType;

export const filmEmptyProfessionList: FilmProfessionsList = {
  archive_footage: [],
  cinematographer: [],
  composer: [],
  editor: [],
  production_designer: [],
  self: [],
  writer: [],
  director: [],
  actor: [],
  producer: [],
};

export const nameEmptyProfessionList: NameProfessionsList = {
  archive_footage: [],
  cinematographer: [],
  composer: [],
  editor: [],
  production_designer: [],
  self: [],
  writer: [],
  director: [],
  actor: [],
  producer: [],
};
