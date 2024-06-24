enum EErrorType {
  SHOWABLE = "SHOWABLE",
  DOMAIN_LOGIC = "DOMAIN_LOGIC",
  RUNTIME = "RUNTIME",
  TIMEOUT = "TIMEOUT",
}

interface IError<CONTEXT = unknown> {
  type: EErrorType;
  code: string;
  message: string;
  context: CONTEXT;
}

export { EErrorType, IError };
