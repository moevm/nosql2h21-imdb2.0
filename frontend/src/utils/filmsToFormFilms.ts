import FilmModel from "../stores/FilmStore/FilmModel";
import {
  filmEmptyProfessionList,
  FilmProfessionsList,
  Professions,
} from "../shared/constants/professions";

const filmsToFormFilms = (
  films: FilmModel
): [
  Omit<FilmModel, "professions" | "getNamesByProfession" | "setNewPoster">,
  FilmProfessionsList
] => {
  const formProfessions: FilmProfessionsList = filmEmptyProfessionList;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in formProfessions) {
    formProfessions[key as Exclude<Professions, Professions.Actor>] =
      films.professions
        .filter((f) => f.category === key)
        .map((el) => {
          return { name: el.name, nameId: el.nameId };
        });
  }

  formProfessions[Professions.Actor] = films.professions
    .filter((f) => f.category === Professions.Actor)
    .map((el) => {
      return { name: el.name, character: el.character, nameId: el.nameId };
    });

  const { professions, getNamesByProfession, setNewPoster, ...formFilms } =
    films;

  return [{ ...formFilms }, { ...formProfessions }];
};

export default filmsToFormFilms;
