interface IFavourites {
  events: string[];
  tournaments: string[];
}

interface IWithFavourites {
  favourites: IFavourites;
}

const favouritesState: IWithFavourites = {
  favourites: {
    events: [],
    tournaments: [],
  },
};

export { favouritesState, type IWithFavourites, type IFavourites };
