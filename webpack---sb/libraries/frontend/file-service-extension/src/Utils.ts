import { EFileType, type TFileDto } from "@sb/file-service";
import { type TPermanentFileInForm } from "./Model";

//transforms fileDTO into a value that must be stored in the form-new for proper operation
const permanentFileToFormValue = (id: TFileDto["id"]): TPermanentFileInForm => ({
  id,
  type: EFileType.permanent,
});

export {
  permanentFileToFormValue,

};
