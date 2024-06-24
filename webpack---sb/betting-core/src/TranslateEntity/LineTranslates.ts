export const lineTeamTranslateNs = `line.$theme$.team`;
export const lineCategoryTranslateNs = `line.$theme$.category`;
export const lineTournamentTranslateNs = `line.$theme$.tournament`;

export const sbSportTranslateNs = `shared.$theme$.sport`;
export const sbCountryTranslateNs = `shared.$theme$.country`;

export const allEntityTranslateKeys = [
  lineTeamTranslateNs,
  lineCategoryTranslateNs,
  lineTournamentTranslateNs,
  sbSportTranslateNs,
  sbCountryTranslateNs,
];

export const getTeamTranslate = (teamId: string) => `${lineTeamTranslateNs}.${teamId}`;

export const getCategoryTranslate = (categoryId: string) => `${lineCategoryTranslateNs}.${categoryId}`;

export const getTournamentTranslate = (tournamentId: string) => `${lineTournamentTranslateNs}.${tournamentId}`;
