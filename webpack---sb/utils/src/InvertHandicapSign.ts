export const invertHandicapSign = (handicap: string) => handicap === "0"
  ? handicap
  : -handicap > 0
    ? `+${-handicap}`
    : `${-handicap}`;
