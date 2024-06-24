// @ts-nocheck
import { useCallback, useReducer } from "react";
import { not } from "@sb/utils";

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

const readFileAsync = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => resolve(reader.result);

  reader.onerror = reject;

  reader.readAsDataURL(file);
});

const FileUploader = (
  {
    className,
    multiple,
    children,
    onStart,
    onEnd,
    onResult,
    onError,
    allowedTypes = [],
    validateFile,
    ...rest
  },
) => {
  const [reading, toggleReading] = useReducer(not<boolean>, false);

  const readFileCallback = useCallback(
    async (file: any) => {
      try {
        await validateFile(file, allowedTypes);

        const result = await readFileAsync(file);

        onResult({ filename: file.name, image: result, rawFile: file });
      } catch (e) {
        onError(e);
      }
    },
    [onResult, onError],
  );

  const finallyCallback = useCallback(
    () => {
      toggleReading();

      onEnd && onEnd();
    },
    [onEnd],
  );

  const onChange = useCallback(
    (event: any) => {
      toggleReading();

      onStart && onStart();

      const asArray = Array.from(event.target.files);

      // eslint-disable-next-line no-param-reassign
      event.target.value = null;

      void asyncForEach(asArray, readFileCallback)
        .finally(finallyCallback);
    },
    [onStart],
  );

  return (
    <label className={className}>
      <input
        type={"file"}
        multiple={multiple}
        onChange={onChange}
        disabled={reading}
        accept={allowedTypes.join(", ")}
        {...rest}
      />

      {children}
    </label>
  );
};
FileUploader.displayName = "FileUploader";

export { FileUploader };
