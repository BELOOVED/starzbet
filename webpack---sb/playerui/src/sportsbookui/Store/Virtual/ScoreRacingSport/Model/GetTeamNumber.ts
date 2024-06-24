// @ts-ignore
const getTeamNumber = (shortId: string): `${number}` => shortId.replace("p", "");

export { getTeamNumber };
