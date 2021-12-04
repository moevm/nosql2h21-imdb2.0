import {
  filmEmptyProfessionList,
  ProfessionArray,
  Professions,
  FilmProfessionsList,
  NameProfessionsList,
} from "../shared/constants/professions";

const getDeletedProfessions = (
  prof?: FilmProfessionsList | NameProfessionsList,
  isFilmList = true
): Professions[] => {
  const deletedProfessions: Professions[] = [];

  if (!prof) prof = filmEmptyProfessionList;

  ProfessionArray.forEach((p) => {
    if (
      isFilmList &&
      (p === Professions.Actor ||
        p === Professions.Director ||
        p === Professions.Writer)
    )
      return;

    if (!prof || prof[p].length <= 0) {
      deletedProfessions.push(p);
    }
  });

  return deletedProfessions;
};

export { getDeletedProfessions };
