type TDrawerState = {
  id: string | null;
}

type TWithDrawerState = {
  drawer: TDrawerState;
}

const gameInfoDrawerInitialState: TWithDrawerState = {
  drawer: { id: null },
};

export type {
  TDrawerState,
  TWithDrawerState,
};

export { gameInfoDrawerInitialState };
