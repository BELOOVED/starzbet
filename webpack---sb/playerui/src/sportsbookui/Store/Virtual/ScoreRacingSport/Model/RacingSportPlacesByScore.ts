// @ts-nocheck
const racingSportPlacesByScore = (score) => Object.entries(score)
  .filter((([, place]) => !isNaN(place)))
  .sort(([, placeA], [, placeB]) => placeA - placeB)
  .slice(0, 3);

export { racingSportPlacesByScore };
