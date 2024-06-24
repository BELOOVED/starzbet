import { type DetailedHTMLProps, type ImgHTMLAttributes, memo } from "react";
import { getPathToPublicFileWithFormatExt } from "../Utils/GetImageFormatParam";

interface IPublicImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  pathToFile: string;
}

const PublicImage = memo<IPublicImageProps>(({ pathToFile, ...rest }) => (
  <img src={getPathToPublicFileWithFormatExt(pathToFile)} {...rest} />
));
PublicImage.displayName = "PublicImage";

export { PublicImage, type IPublicImageProps };
