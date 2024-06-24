import { FILES_FIELD, objectField } from "@sb/form-new";
import { fileExtensions } from "../../Utils/WithFiles";

const filesField = {
  [FILES_FIELD]: objectField({ extensions: fileExtensions(false) }),
};

export { filesField };
