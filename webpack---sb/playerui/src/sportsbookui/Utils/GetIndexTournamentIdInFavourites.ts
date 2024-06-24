const getIndexTournamentIdInFavourites = (favourites: string[] = [], tournamentId: string) => {
  const index = favourites.indexOf(tournamentId);

  return index === -1 ? Infinity : index;
};

export { getIndexTournamentIdInFavourites };
