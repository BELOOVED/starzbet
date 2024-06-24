import { IS_SERVER, type TNullable } from "@sb/utils";
import { publicApiUrl } from "../Constants/PublicApiUrl";

type TImageFormatParam = TNullable<"format=webp">;

const isWebPSupported = () => {
  // todo @Bond check support SSR
  if (!IS_SERVER) {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
    }
  }

  return false;
};

const IS_WEBP_SUPPORTED = isWebPSupported();

const IMAGE_FORMAT_PARAM: TImageFormatParam = IS_WEBP_SUPPORTED ? "format=webp" : null;

const format = IMAGE_FORMAT_PARAM ? "?" + IMAGE_FORMAT_PARAM : "";

const ext = IS_WEBP_SUPPORTED ? "webp" : "jpg";

const getPathToPublicFileWithFormatExt = (pathToFile: string) => `${publicApiUrl}/${pathToFile}.${ext}${format}`;

export { IMAGE_FORMAT_PARAM, IS_WEBP_SUPPORTED, getPathToPublicFileWithFormatExt };
