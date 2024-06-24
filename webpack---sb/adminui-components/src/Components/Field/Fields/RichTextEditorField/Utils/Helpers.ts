import { EFileStateType, EFileType, fileServiceSelectors, isFileType, type TWithFileServiceState } from "@sb/file-service";
import { getNotNil, isString } from "@sb/utils";
import { type ITranslate } from "@sb/utils/IsTranslateMap";
import { type TFileId, separator } from "./Model";

const parseFileId = (imageId: string): TFileId => {
  const typeAndIdArr = imageId.split(separator);

  if (typeAndIdArr.length === 1) {
    return ({
      type: EFileType.permanent,
      id: imageId,
    });
  }

  const type = getNotNil(typeAndIdArr[0], ["parseFileId"], "type");

  const id = getNotNil(typeAndIdArr[1], ["parseFileId"], "id");

  if (isFileType(type) && isString(id)) {
    return { type, id };
  }

  throw new Error(`"${type}"  is not EFileType or ${id} is not String`);
};

const getPayloadWithDataAttrSelector=
  <TState extends TWithFileServiceState> (state: TState, value: ITranslate[]): ITranslate[] => value.map(({ locale, translate }) => {
    const source = new DOMParser().parseFromString(translate, "text/html").body;

    const images = source.getElementsByTagName("img");

    for (const image of images) {
      const imageId = image.dataset.imageId;
      if (imageId) {
        const { type, id } = parseFileId(imageId);

        if (type === EFileType.temporary) {
          image.dataset.imageId =
          getNotNil(fileServiceSelectors[EFileStateType.temporary](state)[id]?.id, ["getPayloadWithDataAttr"], "uuid");
        }
      }
    }

    return { locale: locale, translate: source.innerHTML };
  });

const createImageId = (fileId: TFileId): string => `${fileId.type}${separator}${fileId.id}`;

export { parseFileId, createImageId, getPayloadWithDataAttrSelector };
