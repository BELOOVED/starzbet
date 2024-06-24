import { EHttpMethod } from "./EHttpMethod";
import { EContentEncoding } from "./EContentEncoding";

interface ISetting {
  /**
   * Timeout in ms. If 0 no timeout.
   */
  timeout?: number | undefined;

  /**
   * Additional headers for request.
   */
  headers?: {};

  /**
   * HTTP method to use.
   */
  httpMethod: EHttpMethod;

  /**
   * Content encoding to use.
   */
  contentEncoding: EContentEncoding;
  /**
   *  AbortSignal
   */
  signal?: AbortSignal | null | undefined,
}

const emptySettings: ISetting = {
  timeout: 0,
  headers: {},
  httpMethod: EHttpMethod.POST,
  contentEncoding: EContentEncoding.JSON,
};

const emptyGetSettings: ISetting = {
  timeout: 0,
  headers: {},
  httpMethod: EHttpMethod.GET,
  contentEncoding: EContentEncoding.JSON,
};

export {
  ISetting,
  emptySettings,
  emptyGetSettings,
};
