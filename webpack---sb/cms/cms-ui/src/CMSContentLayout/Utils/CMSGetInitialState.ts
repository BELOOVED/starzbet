import { isArray, isNil, isObject, isString, type TAnyObject } from "@sb/utils";
import { permanentFileToFormValue } from "@sb/file-service-extension";

const typename = "__typename";

const getInitialState = (obj: TAnyObject): TAnyObject => {
  const content = JSON.parse(JSON.stringify(obj)) as TAnyObject;
  const fn = (obj: TAnyObject) => {
    if (isObject(obj)) {
      for (const field in obj) {
        const record = obj[field];
        if (field === typename || isNil(record)) {
          delete obj[field];
        }
        if (isObject(record)) {
          if (typename in record && record[typename] === "Image_Type" && isString(field)) {
            const files = "files" in record ? record.files : null;
            // files = ["uuid", "uuid2"]
            const correctFileRecord = (isArray(files) && files.every(isString))
              ? files.map((id) =>
                permanentFileToFormValue(id))
              : [];
            const permanentFiles = {
              files: correctFileRecord,
            };
            obj[field] = fn(permanentFiles);
          } else {
            fn(record);
          }
        }
      }
    }

    return obj;
  };

  return fn(content);
};

export { getInitialState };
