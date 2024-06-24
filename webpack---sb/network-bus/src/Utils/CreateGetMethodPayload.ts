import { ISetting } from "../Model";
import { encodeBase64 } from "@sb/utils";
import { createRequestBody } from "./CreateRequestBody";

export function createGetMethodPayload(request: any, uri: string, settings: ISetting): string {
  let payload = "";

  if (request && Object.keys(request).length) {
    const requestBody = createRequestBody(request, uri, settings);
    const base64Payload = encodeBase64(requestBody);
    payload = "?payload=" + encodeURIComponent(base64Payload);
  }

  return payload
}
