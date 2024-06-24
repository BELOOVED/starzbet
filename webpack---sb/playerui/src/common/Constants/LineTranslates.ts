import {
  lineCategoryTranslateNs,
  lineTeamTranslateNs,
  lineTournamentTranslateNs,
  sbCountryTranslateNs,
  sbSportTranslateNs,
} from "@sb/betting-core/TranslateEntity/LineTranslates";

const themeLineTeamTranslateNs = lineTeamTranslateNs.replace("$theme$", process.env.THEME);

const themeLineCategoryTranslateNs = lineCategoryTranslateNs.replace("$theme$", process.env.THEME);

const themeLineTournamentTranslateNs = lineTournamentTranslateNs.replace("$theme$", process.env.THEME);

const themeSbSportTranslateNs = sbSportTranslateNs.replace("$theme$", process.env.THEME);

const themeSbCountryTranslateNs = sbCountryTranslateNs.replace("$theme$", process.env.THEME);

export {
  themeLineTeamTranslateNs,
  themeLineCategoryTranslateNs,
  themeLineTournamentTranslateNs,
  themeSbSportTranslateNs,
  themeSbCountryTranslateNs,
};
