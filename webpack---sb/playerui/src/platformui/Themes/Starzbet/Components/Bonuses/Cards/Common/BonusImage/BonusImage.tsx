import { memo } from "react";
import { type TFile_Fragment } from "@sb/graphql-client";
import { type TNullable } from "@sb/utils";
import noimage from "../../../../../Assets-Optimized/Images/noimage.png";
import classes from "./BonusImage.module.css";
import { PublicImage } from "../../../../../../../../common/Components/PublicImage";

interface IBonusImageProps {
    file: TNullable<TFile_Fragment>;
}

const BonusImage = memo<IBonusImageProps>(({ file }) => (
  <div className={classes.imageContainer}>
    {
      file
        ? <PublicImage pathToFile={file.pathToFile} className={classes.image} />
        : <img src={noimage} alt={"noimage"} className={classes.image} />
    }
  </div>
));
BonusImage.displayName = "BonusImage";

export { BonusImage };
