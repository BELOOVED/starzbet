// @ts-ignore
const isForcedTracingEnabled = () => !!(typeof window === "undefined" ? global : window).__ERIS_GRAPHQL_FORCE_TRACING;

// @ts-ignore
const isBatchEnabled = () => !!(typeof window === "undefined" ? global : window).__ERIS_GRAPHQL_BATCH_ENABLED;

// @ts-ignore
const isTest = process.env.NODE_ENV !== "test";

export {
  isForcedTracingEnabled,
  isBatchEnabled,
  isTest,
};
