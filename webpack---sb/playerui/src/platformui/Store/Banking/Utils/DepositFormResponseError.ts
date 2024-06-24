class DepositFormResponseError extends Error {
  constructor(response: unknown, context: string) {
    super(`[${context}]: Unexpected Response type ${JSON.stringify(response)}`);
    this.name = "Call Response";
  }
}

export { DepositFormResponseError };
