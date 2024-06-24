import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";

const sports = Object.keys(sportCodeToIdMap).join("|");

const r = `(^\\/|)(${sports})\\/(.*?)\\/(.*?)(\\/|$)`;

const matchAllTournamentSelection = (str: string) => {
  const matchArray = [];

  const reg = new RegExp(r, "g");

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = reg.exec(str);

    if (!match) {
      break;
    }

    matchArray.push({
      sportSlug: match[2],
      categorySlug: match[3],
      tournamentSlugs: match[4],
    });
  }

  return matchArray;
};

export { matchAllTournamentSelection };
