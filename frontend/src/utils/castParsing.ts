import { Professions } from "../stores/FilmStore/FilmModel";

const parseCast = (
  cast: any
): Array<{
  profession: string;
  id: number;
  character: string | null;
}> => {
  const answer: Array<{
    profession: string;
    id: number;
    character: string | null;
  }> = [];

  const actors: { check: string; id: number }[] = [];
  const characters: { check: string; character: string }[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(cast)) {
    if (key.startsWith("actor_")) {
      actors.push({ check: key.slice(6), id: value as number });
    } else if (key.startsWith("character_")) {
      characters.push({ check: key.slice(10), character: value as string });
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cast[key].forEach((e) => {
        answer.push({ id: e, profession: key, character: null });
      });
    }
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < actors.length; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < characters.length; j++) {
      if (characters[j].check === actors[i].check) {
        if (!characters[j].character || !actors[i].id) break;

        answer.push({
          id: actors[i].id,
          profession: Professions.Actor,
          character: characters[j].character,
        });
        break;
      }
    }
  }
  return answer;
};

export default parseCast;