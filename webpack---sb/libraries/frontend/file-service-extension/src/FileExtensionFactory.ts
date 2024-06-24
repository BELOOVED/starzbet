import { type TFormExtension } from "@sb/form-new";
import { onChangeFileInputEpic } from "./OnChangeFileInputEpic";
import { fileDecoratorsFactory } from "./Decorators";
import { FILE_EXTENSION_KEY, type TFileServiceExtensionState } from "./Model";

//Use with submitting extension
const fileExtensionFactory = <State extends TFileServiceExtensionState>(
  formName: string,
  toShared = false,
): TFormExtension<State> => (base) => ({
    ...base,
    epics: [
      ...base.epics,
      onChangeFileInputEpic(formName, toShared),
    ],
    decorators: [...base.decorators, ...fileDecoratorsFactory<State>(formName)],
    extensionsKeys: [...base.extensionsKeys, FILE_EXTENSION_KEY],
  });

export {
  fileExtensionFactory,
};
