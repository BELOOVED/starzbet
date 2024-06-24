// @ts-nocheck
const filterSubscribersHandler = (subscribers, filterable) => Object.keys(subscribers).reduce(
  (acc, eventId) => ({
    ...acc,
    [eventId]: subscribers[eventId].filter((subs) => subs !== filterable),
  }),
  {},
);

export { filterSubscribersHandler };
