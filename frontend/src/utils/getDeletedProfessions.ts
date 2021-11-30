import {
  ProfessionArray,
  Professions,
  ProfessionsList,
} from "../stores/FilmStore/FilmModel";

const getDeletedProfessions = (prof: ProfessionsList): Professions[] => {
  const deletedProfessions: Professions[] = [];

  ProfessionArray.forEach((p) => {
    if (
      p === Professions.Actor ||
      p === Professions.Director ||
      p === Professions.Writer
    )
      return;

    if (prof[p].length <= 0) {
      deletedProfessions.push(p);
    }
  });

  return deletedProfessions;
};

export { getDeletedProfessions };
