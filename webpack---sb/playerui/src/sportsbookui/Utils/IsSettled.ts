const isSettled = ({ settledAt, cashOutAt, canceledAt }) => (
  settledAt !== null || cashOutAt !== null || canceledAt !== null
);

export { isSettled };
