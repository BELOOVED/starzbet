const vipClubGetDistributionFixedByWinnerPlaces = (winnerPlaces: number, poolSize: number) =>
  (poolSize / winnerPlaces).toFixed(2);

export { vipClubGetDistributionFixedByWinnerPlaces };
