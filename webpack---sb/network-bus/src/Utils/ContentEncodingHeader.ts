import { EContentEncoding } from "../Model/EContentEncoding";

const contentEncodingPerContentType: Record<EContentEncoding, string> = {
  [EContentEncoding.JSON]: "application/json",
  [EContentEncoding.PROTO]: "application/proto",
};

export { contentEncodingPerContentType };
