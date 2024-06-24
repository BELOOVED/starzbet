import { EHttpMethod } from "../Model/EHttpMethod";
import { emptySettings } from "../Model/ISetting";
import { fetchWithAbort } from "./FetchWithAbort";
import { IError } from "../Model/IError";
import { EResponseContentType } from "../Model";
import { METADATA_HEADER_NAME } from "./Metadata";
import { isErrorResponse } from "./ResponseResultHeader";
import { TCallClient } from "./TCallClient";
import { createHeaders } from "./CreateHeaders";
import { createGetMethodPayload } from "./CreateGetMethodPayload";
import { createRequestBody } from "./CreateRequestBody";
import { handleError } from "./HandleError";

const fetchCallClient: TCallClient = (request, url, uri, metadata, settings = emptySettings, metadataHeaderName = METADATA_HEADER_NAME) => {
  switch (settings.httpMethod) {
    case EHttpMethod.GET:
      return callGetClient(request, url, uri, metadata, settings, metadataHeaderName);
    case EHttpMethod.POST:
      return callPostClient(request, url, uri, metadata, settings, metadataHeaderName);
  }
}

const callGetClient: TCallClient = (request, url, uri, metadata = {}, settings = emptySettings, metadataHeaderName) => {
  const payload = createGetMethodPayload(request, uri, settings)

  return fetchWithAbort(
    url + payload,
    {
      method: "GET",
      headers: createHeaders(metadata, settings, metadataHeaderName),
      signal: settings.signal,
    },
    settings.timeout,
  )
    .then(handleResponse)
    .catch((e) => handleError(e, uri));
}

const callPostClient: TCallClient = (request, url, uri, metadata = {}, settings = emptySettings, metadataHeaderName) => {
  const requestBody = createRequestBody(request || {}, uri, settings);

  return fetchWithAbort(
    url,
    {
      method: "POST",
      headers: createHeaders(metadata, settings, metadataHeaderName),
      body: requestBody,
      signal: settings.signal,
    },
    settings.timeout,
  )
    .then(handleResponse)
    .catch((e) => handleError(e, uri));
}

// TODO add support of different return content types
async function handleResponse(response: Response ): Promise<any> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  if (isErrorResponse(response)) {
    throw (await response.json() as IError[]);
  }

  const contentType = response.headers.get("content-type")

  if (contentType === EResponseContentType.json) {
    return response.json(); // todo support lazy gzip message
  }

  if (contentType === EResponseContentType.csv) {
    return response.blob();
  }

  throw new Error(`Request failed. Not supported content-type ${contentType} `);
}

export { fetchCallClient };
