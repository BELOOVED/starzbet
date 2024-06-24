// @ts-nocheck
const fetchedSnapshotAction = (snapshot) => ({
  type: "@DGA/SNAPSHOT_RECEIVED",
  payload: { snapshot },
});

const openedDgaGameAction = () => ({
  type: "@DGA/OPENED_DGA_GAME",
});

const closedDgaGameAction = () => ({
  type: "@DGA/CLOSED_DGA_GAME",
});

export { fetchedSnapshotAction, openedDgaGameAction, closedDgaGameAction };
