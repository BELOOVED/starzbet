import { type ReactNode } from "react";
import { type TVoidFn } from "@sb/utils";
import { type TSportId } from "../../MarketFilter/Model/MarketPreset";

const outrightPostfix = "_outrights";

interface IWithActiveAndToggle {
  active: boolean;
  toggleActive: TVoidFn;
}

interface ITournamentProps extends IWithActiveAndToggle {
  id: string;
  eventCount?: number;
  extraName?: ReactNode;
}

interface ICategoryProps extends IWithActiveAndToggle {
  categoryId: string;
  tournamentIdList: string[];
  noOutrights: boolean;
  isLive?: boolean;
}

interface ISportMenuItemProps extends IWithActiveAndToggle {
  sportId: TSportId;
  categoryIdList: string[];
  isLive?: boolean;
  isESport?: boolean;
}

const fakeOutrightTournamentId = (tournamentId: string) => `${tournamentId}${outrightPostfix}`;

const unfakeOutrightTournamentId = (fakeTournamentId: string) => fakeTournamentId.replace(outrightPostfix, "");

const isFakeOutrightTournamentId = (tournamentId: string) => tournamentId.includes(outrightPostfix);

const fakeOutrightTournamentSlug = (tournamentSlug: string) => `${tournamentSlug}${outrightPostfix}`;

const unfakeOutrightTournamentSlug = (fakeTournamentSlug: string) => fakeTournamentSlug.replace(outrightPostfix, "");

const isFakeOutrightTournamentSlug = (tournamentSlug: string) => tournamentSlug.includes(outrightPostfix);

const maybeFakeOutrightTournamentSlugById = (tournamentId: string, tournamentSlug: string) => isFakeOutrightTournamentId(tournamentId)
  ? fakeOutrightTournamentSlug(tournamentSlug)
  : tournamentSlug;

const maybeFakeOutrightTournamentIdBySlug = (tournamentSlug: string, tournamentId: string) => isFakeOutrightTournamentSlug(tournamentSlug)
  ? fakeOutrightTournamentId(tournamentId)
  : tournamentId;

export {
  fakeOutrightTournamentId,
  unfakeOutrightTournamentId,
  isFakeOutrightTournamentId,
  fakeOutrightTournamentSlug,
  unfakeOutrightTournamentSlug,
  maybeFakeOutrightTournamentSlugById,
  maybeFakeOutrightTournamentIdBySlug,
};

export type {
  ITournamentProps,
  ICategoryProps,
  ISportMenuItemProps,
};
