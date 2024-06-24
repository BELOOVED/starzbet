import { ESportCode } from "@sb/betting-core/ESportCode";

type TSportCode =
  ESportCode.soccer
  | ESportCode.tennis
  | ESportCode.basketball
  | ESportCode.volleyball
  | ESportCode.ice_hockey
  | ESportCode.table_tennis
  | ESportCode.badminton
  | ESportCode.beach_volleyball
  | ESportCode.handball
  | ESportCode.futsal
  | ESportCode.rugby;

const sportCodes: TSportCode[] = [
  ESportCode.soccer,
  ESportCode.tennis,
  ESportCode.basketball,
  ESportCode.volleyball,
  ESportCode.ice_hockey,
  ESportCode.table_tennis,
  ESportCode.badminton,
  ESportCode.beach_volleyball,
  ESportCode.handball,
  ESportCode.futsal,
  ESportCode.rugby,
];

const isSupportedSportCode = (sportCode: ESportCode): sportCode is TSportCode =>
  sportCodes.includes(sportCode as TSportCode);

export {
  type TSportCode,
  ESportCode,
  sportCodes,
  isSupportedSportCode,
};
