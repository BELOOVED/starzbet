import { EErrorType, IError } from "../Model/IError";

const extractErrorReason = (error: Error | IError): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error.type === EErrorType.SHOWABLE) {
    return error.message
  }

  const response = JSON.stringify(error);

  if (/url for uri: ([\w.]+) not resolved/i.test(response)) {
    return `Unresolved uri`;
  }

  if (/internal server error/i.test(response)) {
    return `Internal server error`;
  }

  if (/domain logic exception/i.test(response)) {
    return `Domain logic exception`;
  }

  if (/errors exception/i.test(response)) {
    return `Errors exception`;
  }

  if (/runtime exception/i.test(response)) {
    return `Runtime exception`;
  }

  return error.message;
}


export { extractErrorReason };
