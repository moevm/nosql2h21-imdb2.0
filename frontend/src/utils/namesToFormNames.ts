import NameModel from "../stores/NameStore/NameModel";
import {
  nameEmptyProfessionList,
  Professions,
  NameProfessionsList,
} from "../shared/constants/professions";

const namesToFormNames = (
  names: NameModel
): [
  Omit<NameModel, "professions" | "getNamesByProfession" | "setNewAvatar">,
  NameProfessionsList
] => {
  const formProfessions: NameProfessionsList = nameEmptyProfessionList;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in formProfessions) {
    formProfessions[key as Exclude<Professions, Professions.Actor>] =
      names.professions
        .filter((f) => f.profession === key)
        .map((el) => {
          return { title: el.title, filmId: el.filmId };
        });
  }

  formProfessions[Professions.Actor] = names.professions
    .filter((f) => f.profession === Professions.Actor)
    .map((el) => {
      return { title: el.title, characters: el.characters, filmId: el.filmId };
    });

  const { professions, getNamesByProfession, setNewAvatar, ...formNames } =
    names;

  return [{ ...formNames }, { ...formProfessions }];
};

export default namesToFormNames;
