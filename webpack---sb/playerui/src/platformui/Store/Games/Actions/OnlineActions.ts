
const onlineUpdateReceiveAction = (
  online: Record<string, number>,
) => ({
  type: "@GAMES/ONLINE_UPDATE_RECEIVE_ACTION",
  payload: { online },
});

export { onlineUpdateReceiveAction };
