// @ts-nocheck
import { createContext } from "react";
import { createHeadersWithMetadata } from "@sb/network-bus/Utils";
import { type TGlobalErrorHandlerCreator } from "../../common/GlobalErrorHandler/GlobalErrorHandler";
import { authTokenService } from "../../common/Store/Auth/AuthTokenService";

const apiUrl = process.env.FILESERVER_PRIVATE_API_URL;

const readFileAsync = (file) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    reader.readAsDataURL(file);
  })
);

class FileServerApi {
  #globalErrorHandler: TGlobalErrorHandlerCreator | undefined;

  constructor(globalErrorHandler: TGlobalErrorHandlerCreator) {
    this.#globalErrorHandler = globalErrorHandler;
  }

  upload = (rawFiles) => {
    const body = new FormData();

    rawFiles.forEach((file) => body.append(file.name, file));

    return fetch(
      `${apiUrl}/file/upload`,
      {
        method: "POST",
        headers: {},
        body,
      },
    ).then((r) => r.json());
  };

  load = async (pathToFile) => {
    const input = `${apiUrl}/file/${pathToFile}`;

    const token = await authTokenService.getTokenOrError();

    return (
      fetch(
        `${apiUrl}/file/${pathToFile}`,
        {
          method: "GET",
          headers: createHeadersWithMetadata({
            platformPlayerAccessToken: token.accessToken,
          }),
          signal: authTokenService.createSignal(),
        },
      )
        .then((r) => r.blob())
        .then(readFileAsync)
        .catch((e) => {
          if (this.#globalErrorHandler) {
            return this.#globalErrorHandler(input)(e);
          }

          throw e;
        })
    );
  };
}

const FileServerApiContext = createContext<FileServerApi>(null);

export { FileServerApi, FileServerApiContext };
