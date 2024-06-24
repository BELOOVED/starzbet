import { newError } from "./ErrorUtil";
import { EErrorType } from "../Model";

const toProtoBinaryMap: Record<string, (src: any) => any> = {}; // message uri to object converter to proto

const addToProtoBinary = (uri: string, toProtoBinary: (src: any) => any) => {
  toProtoBinaryMap[uri] = toProtoBinary;
};

const getToProtoBinary = (uri: string): (src: any) => any => {
  const toProtoBinary = toProtoBinaryMap[uri];

  if (!toProtoBinary) {
    throw newError(EErrorType.RUNTIME, "to_proto_not_found", `toProtoBinary for uri not found. Uri: ${uri}`, {});
  }

  return toProtoBinary;
}

export { addToProtoBinary, getToProtoBinary };
