import { IMetadata, ISetting } from "../Model";
import { createHeadersWithMetadata, METADATA_HEADER_NAME } from "./Metadata";
import { contentEncodingPerContentType } from "./ContentEncodingHeader";

export const createHeaders = (metadata: IMetadata, settings: ISetting, metadataHeaderName: string = METADATA_HEADER_NAME): Record<string, string> => {
  const contentType = contentEncodingPerContentType[settings.contentEncoding]

  return {
    "Accept": contentType,
    "Content-Type": contentType,
    ...createHeadersWithMetadata(metadata, metadataHeaderName),
    ...settings.headers,
  }
}
