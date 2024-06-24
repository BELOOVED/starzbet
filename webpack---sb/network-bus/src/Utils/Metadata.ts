import { IMetadata } from "../Model/IMetadata";
import { decodeBase64, encodeBase64, JSONParse } from "@sb/utils";

const METADATA_HEADER_NAME = "X-Message-Metadata"

const createHeadersWithMetadata = (metadata: IMetadata, name = METADATA_HEADER_NAME): Record<string, string> => ({
  [name]: encodeBase64(JSON.stringify(metadata)),
});

const parseMetadataFromHeaders = (headers: Record<string, string>, name = METADATA_HEADER_NAME): null | IMetadata => {
  const encoded = headers[name];

  if (encoded === undefined) {
    return null;
  }

  return JSONParse<IMetadata>(decodeBase64(encoded));
};

export { METADATA_HEADER_NAME, createHeadersWithMetadata, parseMetadataFromHeaders };
