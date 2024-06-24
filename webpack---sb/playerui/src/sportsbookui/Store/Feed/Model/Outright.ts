import { EOutrightType } from "@sb/betting-core/EOutrightType";

const isWinnerYesNo = (type: EOutrightType) => type === EOutrightType.winner_yes_no;

const isOutrightKind = (kind: string) => kind === "outright";

const isOutrightPick = (pick: { ["@kind"]: string; }) => isOutrightKind(pick["@kind"]);

export { isWinnerYesNo, isOutrightKind, isOutrightPick };
