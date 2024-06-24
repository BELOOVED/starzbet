interface IPragmaticInfo {
  gameResult: {
    gameId: string;
    result: string;
    time: string;
  }[];
  totalSeatedPlayers: number;
  tableId: string;
  tableName: string;
  newTable: boolean;
  languageSpecificTableInfo: string;
  tableImage: string;
  tableLimits: {
    ranges: number[];
    minBet: number;
    maxBet: number;
    maxPlayers: number;
  };
  dealer: {
    name: string;
  };
  tableOpen: true;
  tableType: string;
  currency: string;
}

interface IWithPragmaticDgaState {
  dgaInfo: Record<string, IPragmaticInfo>;
  dgaGameCount: number;
}
const pragmaticDgaInitialState: IWithPragmaticDgaState = {
  dgaInfo: {} as Record<string, IPragmaticInfo>,
  dgaGameCount: 0,
};

export { pragmaticDgaInitialState };
export type { IWithPragmaticDgaState };
