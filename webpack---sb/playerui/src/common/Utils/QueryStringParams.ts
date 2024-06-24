import queryString from "query-string";
import { IS_SERVER } from "@sb/utils";

const queryStringParams = IS_SERVER ? {} : queryString.parse(window.location.search);

const getBooleanFromQS = (field: string) => {
  const param = queryStringParams[field];

  if (!param) {
    return false;
  }

  try {
    return JSON.parse(param as string);
  } catch (e) {
    return false;
  }
};
const queryStringMobile = getBooleanFromQS("mobile");

export { queryStringParams, queryStringMobile };
