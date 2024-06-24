import { type TFile_Fragment } from "@sb/graphql-client";

const splitByImageMimeType = (
  files: TFile_Fragment[],
): { images: TFile_Fragment[]; nonImages: TFile_Fragment[]; } => {
  const imagesArray: TFile_Fragment[] = [];
  const nonImagesArray: TFile_Fragment[] = [];

  files.forEach((file) => {
    if (file.mimeType.includes("image")) {
      imagesArray.push(file);
    } else {
      nonImagesArray.push(file);
    }
  });

  return { images: imagesArray, nonImages: nonImagesArray };
};

export {
  splitByImageMimeType,
};
