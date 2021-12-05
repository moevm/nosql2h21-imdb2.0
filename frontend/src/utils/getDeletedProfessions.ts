import {
  filmEmptyProfessionList,
  ProfessionArray,
  Professions,
  FilmProfessionsList,
  NameProfessionsList,
} from "../shared/constants/professions";

const getDeletedProfessions = (
  prof?: FilmProfessionsList | NameProfessionsList
): Professions[] => {
  const deletedProfessions: Professions[] = [];

  if (!prof) prof = filmEmptyProfessionList;

  ProfessionArray.forEach((p) => {
    if (!prof || prof[p].length <= 0) {
      deletedProfessions.push(p);
    }
  });

  return deletedProfessions;
};

export { getDeletedProfessions };
