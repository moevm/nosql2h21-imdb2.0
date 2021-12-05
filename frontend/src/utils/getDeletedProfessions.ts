import {
  filmEmptyProfessionList,
  Professions,
  FilmProfessionsList,
  NameProfessionsList,
} from "shared/constants/professions";
import { appStore } from "../stores";

const getDeletedProfessions = (
  prof?: FilmProfessionsList | NameProfessionsList
): Professions[] => {
  const deletedProfessions: Professions[] = [];

  if (!prof) prof = filmEmptyProfessionList;

  appStore.ProfessionArray.forEach((p) => {
    if (!prof || prof[p].length <= 0) {
      deletedProfessions.push(p);
    }
  });

  return deletedProfessions;
};

export { getDeletedProfessions };
