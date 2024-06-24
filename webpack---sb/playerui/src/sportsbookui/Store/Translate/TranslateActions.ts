const translateFetchedAction = (translate: Record<string, string>) => ({
  type: "@TRANSLATE/FETCHED_ACTION",
  payload: { translate },
});

export { translateFetchedAction };
