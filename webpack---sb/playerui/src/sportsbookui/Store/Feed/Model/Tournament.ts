// @ts-nocheck
import { includesString } from "../../../Utils/IncludesString";

type TTournamentEntries = [string, string[]]

const findTournamentBySearchText = (searchText) => ({ name }) => (
  includesString(name, searchText)
);

export { findTournamentBySearchText, type TTournamentEntries };
