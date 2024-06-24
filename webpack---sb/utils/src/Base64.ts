import { IS_SERVER } from "./Environment";

const arrayBufferToBinary = (buffer: ArrayBufferLike) => new Uint8Array(buffer)
  .reduce((acc, cur) => acc + String.fromCharCode(cur), "");

const encodeBase64 = (input: string, encoding: BufferEncoding = "binary") => {
  if (IS_SERVER) {
    return Buffer.from(input, encoding).toString("base64");
  }

  return window.btoa(input);
};

const decodeBase64 = (input: string) => {
  if (IS_SERVER) {
    return Buffer.from(input, "base64").toString();
  }

  return window.atob(input);
};

const encodeBase64Binary = (input: string) => {
  const codeUnits = new Uint16Array(input.length);

  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = input.charCodeAt(i);
  }

  const binary = arrayBufferToBinary(codeUnits.buffer);

  return IS_SERVER
    ? Buffer.from(binary, "binary").toString("base64")
    : window.btoa(binary);
};

const decodeBase64Binary = (input: string) => {
  const binary = IS_SERVER
    ? Buffer.from(input, "base64").toString("binary")
    : window.atob(input);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return arrayBufferToBinary(new Uint16Array(bytes.buffer));
};

export { encodeBase64, decodeBase64, encodeBase64Binary, decodeBase64Binary };
