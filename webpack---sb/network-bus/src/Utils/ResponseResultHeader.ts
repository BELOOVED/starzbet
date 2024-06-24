import { EResponseResult } from "../Model/EResponseResult";

const ResponseResultHeader = "Response-Result";

const isErrorResponse = (response: Response) => response.headers.get(ResponseResultHeader) === EResponseResult.ERROR;

export { ResponseResultHeader, isErrorResponse };

