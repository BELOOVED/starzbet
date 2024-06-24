import { type IBuilder, objectField } from "@sb/form-new";
import { FILE_EXTENSION_KEY, type IWithFiles } from "./Model";

const withFiles = (): Record<string, IWithFiles> => ({
  [FILE_EXTENSION_KEY]: { withFiles: true },
});

const fileField = ({ extensions }: IBuilder = {}) =>
  objectField({
    extensions: {
      ...extensions,
      ...withFiles(),
    },
  });

export {
  fileField,
  withFiles,
};

