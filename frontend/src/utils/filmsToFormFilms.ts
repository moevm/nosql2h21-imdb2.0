import FilmModel, {
  Professions,
  ProfessionsList,
} from "stores/FilmStore/FilmModel";

const filmsToFormFilms = (
  films: FilmModel
): [
  Omit<FilmModel, "professions" | "getNamesByProfession" | "setNewPoster">,
  ProfessionsList
] => {
  const formProfessions: ProfessionsList = {
    Director: [],
    Writer: [],
    Actor: [],
    Producer: [],
    Composer: [],
  };

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in formProfessions) {
    formProfessions[key as Exclude<Professions, Professions.Actor>] =
      films.professions
        .filter((f) => f.category === key)
        .map((el) => {
          return { name: el.name, id: el.id };
        });
  }

  formProfessions[Professions.Actor] = films.professions
    .filter((f) => f.category === Professions.Actor)
    .map((el) => {
      return { name: el.name, character: el.character, id: el.id };
    });

  const { professions, getNamesByProfession, setNewPoster, ...formFilms } =
    films;

  return [{ ...formFilms }, { ...formProfessions }];
};

export default filmsToFormFilms;
