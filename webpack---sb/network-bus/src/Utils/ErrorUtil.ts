import { isArray, isObject, isString } from "@sb/utils";
import { EErrorType, IError } from "../Model/IError";

const CLIENT_ERROR_CODE = "client_error";

const newError = (type: EErrorType, code: string, message: string, context: any): IError => ({
  type,
  code,
  message,
  context,
});

const clientError = (message: string) => [
  newError(EErrorType.RUNTIME, CLIENT_ERROR_CODE, message, {}),
];


const clientTimeoutError = (message: string) => [
  newError(EErrorType.TIMEOUT, CLIENT_ERROR_CODE, message, {}),
];

const isError = (error: unknown): error is IError =>
  isObject(error) && isString((error as IError).code) && isString((error as IError).message);

const isClientError = (error: unknown): error is IError =>
  isError(error) && error.code === CLIENT_ERROR_CODE;

const isClientTimeoutError = (error: unknown): error is IError =>
  isClientError(error) && error.type === EErrorType.TIMEOUT;

const isResponseErrors = (errors: unknown): errors is [IError, ...IError[]] =>
  isArray(errors) && errors.every(isError);

const isRuntimeError = (error: IError) => error.type === EErrorType.RUNTIME

export {
  newError,
  clientError,
  clientTimeoutError,
  isError,
  isClientError,
  isResponseErrors,
  isClientTimeoutError,
  isRuntimeError,
};
