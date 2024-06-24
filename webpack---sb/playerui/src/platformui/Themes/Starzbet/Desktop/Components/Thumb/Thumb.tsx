// @ts-nocheck
import clsx from "clsx";
import { memo, type MouseEventHandler, useCallback, useContext, useEffect, useRef, useState } from "react";
import { type TVoidFn } from "@sb/utils";
import { type TFile_Fragment } from "@sb/graphql-client";
import classes from "./Thumb.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CloseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { BaseModalCreator, type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { FileServerApiContext } from "../../../../../Api/FileServerApi";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { splitByImageMimeType } from "../../../../../Utils/SplitByImageMimeType";
import { PrivateFileLinks } from "../../../../../Components/FileLink/PrivateFileLinks";
import { ThemedModal } from "../../../Components/ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../../Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalText } from "../../../Components/ThemedModal/ThemedModalText/ThemedModalText";

const PrivateImage = ({ pathToFile, children }) => {
  const mount = useRef(false);

  const [base64, setBase64] = useState(null);

  const fileServerApi = useContext(FileServerApiContext);

  useEffect(
    () => {
      mount.current = true;

      void fileServerApi.load(pathToFile).then((result) => {
        if (mount.current) {
          setBase64(result);
        }
      });

      return () => {
        mount.current = false;
      };
    },
    [],
  );

  return (
    children(base64)
  );
};
PrivateImage.displayName = "PrivateImage";

const ImageContainer = ({ base64, pathToFile, children }) => (
  base64
    ? children(base64)
    : <PrivateImage pathToFile={pathToFile}>{children}</PrivateImage>
);
ImageContainer.displayName = "ImageContainer";

interface IIMGModalProps extends TWithHideModal {
  src: string;
  name: string;
}

const IMGModal = memo<IIMGModalProps>(({ src, hideModal, name }) => (
  <ThemedModal onCancel={hideModal}>
    <ThemedModalHeader closeButtonClickHandler={hideModal}>
      <ThemedModalText>
        {name}
      </ThemedModalText>
    </ThemedModalHeader>

    <ThemedModalBody className={clsx(!IS_MOBILE_CLIENT_SIDE && classes.modal)}>
      <img className={classes.img} src={src} alt={"name"} />
    </ThemedModalBody>
  </ThemedModal>
));
IMGModal.displayName = "IMGModal";

const ThumbContent = memo(({ src, close, name }) => {
  const closeHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();

      close(src);
    },
    [close, src],
  );

  return (
    <BaseModalCreator modal={getModalImage(src, name)}>
      {
        (toggleModal) => (
          <div className={classes.thumb} onClick={toggleModal}>
            <div className={classes.inner}>
              {<img src={src} />}

              {close ? (<CloseIcon onClick={closeHandler} size={"s"} />) : null}
            </div>
          </div>
        )
      }
    </BaseModalCreator>
  );
});
ThumbContent.displayName = "ThumbContent";

const getModalImage = (src: string, name: string) => (toggle: TVoidFn) =>
  <IMGModal src={src} hideModal={toggle} name={name} />;

const ThumbContentBtn = memo(({
  src,
  name,
  close,
  mimeType,
}) => {
  const closeHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();

      close(src);
    },
    [close, src],
  );

  return (
    <BaseModalCreator modal={getModalImage(src, name)}>
      {
        (toggleModal) => {
          const onClick = mimeType.includes("image") ? toggleModal : undefined;

          return (
            <div className={classes.innerBtn} onClick={onClick}>
              <div className={classes.fileName}>
                <Ellipsis>{name}</Ellipsis>
              </div>

              {
                close
                  ? (
                    <CloseIcon
                      width={10}
                      height={10}
                      onClick={closeHandler}
                      color={"darkText"}
                    />
                  )
                  : null
              }
            </div>
          );
        }
      }
    </BaseModalCreator>
  );
});
ThumbContentBtn.displayName = "ThumbContentBtn";

const Thumb = memo(({
  base64,
  pathToFile,
  name,
  close,
}) => (
  <ImageContainer pathToFile={pathToFile} base64={base64}>
    {(src) => (<ThumbContent src={src} name={name} close={close} />)}
  </ImageContainer>

));
Thumb.displayName = "Thumb";

interface IThumbsProps {
  files: TFile_Fragment[];
}

const Thumbs = memo<IThumbsProps>(({ files }) => {
  const { images, nonImages } = splitByImageMimeType(files);

  return (
    <div className={clsx(classes.thumbs, classes.imgThumbs)}>
      {
        images.map(({ base64, pathToFile, originName }, i) => (
          <Thumb
            key={i}
            base64={base64}
            pathToFile={pathToFile}
            name={originName}
          />
        ))
      }

      <PrivateFileLinks files={nonImages} />
    </div>
  );
});
Thumbs.displayName = "Thumbs";

export { Thumbs };
