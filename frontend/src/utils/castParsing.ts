import { Professions } from "../shared/constants/professions";

const parseCast = (
  cast: any
): Array<{
  category: string;
  workerId: number;
  character: string | null;
}> => {
  const answer: Array<{
    category: string;
    workerId: number;
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
        answer.push({ workerId: e, category: key, character: null });
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
          workerId: actors[i].id,
          category: Professions.Actor,
          character: characters[j].character,
        });
        break;
      }
    }
  }
  return answer;
};

export default parseCast;
