import { EContentEncoding, ISetting } from "../Model";
import { getToProtoBinary } from "./ProtoSerialization";
import { Logger } from "./Logger";

const stringify = (request: any, uri: string) => {
  try {
    return JSON.stringify(request);
  } catch (e) {
    Logger.error.rpc("[stringify]", uri, e);

    return {};
  }
}

export const createRequestBody = (request: any, uri: string, settings: ISetting) => {
  switch (settings.contentEncoding) {
    case EContentEncoding.JSON:
      return stringify(request, uri);
    case EContentEncoding.PROTO:
      return getToProtoBinary(uri)(request);
  }
}
