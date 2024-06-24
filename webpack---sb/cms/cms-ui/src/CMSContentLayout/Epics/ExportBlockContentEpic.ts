import { from, mergeMap, of } from "rxjs";
import { saveAs } from "file-saver";
import { isAnyObject, isCreator, type TExplicitAny } from "@sb/utils";
import { appServiceShowErrorMessageAction, appServiceShowSuccessMessageAction, queryEpicFactory } from "@sb/adminui-utils";
import { cmsBlocksQueryAdminUIOptionalFields, query_Cms_Blocks } from "@sb/graphql-client/CmsUI";
import { EWhere_Predicate } from "@sb/graphql-client";
import {
  cmsui_block_error_exportBlocks,
  cmsui_block_success_exportBlocks,
  cmsui_general_message_thisPageHasNoContent,
} from "@sb/translates/cmsui/Keys";
import { EXPORT_BLOCK_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";
import { exportBlockContentAction } from "../CMSLayoutActions";

const removeTypenameValues = (obj: TExplicitAny): TExplicitAny => {
  if (isAnyObject(obj)) {
    delete obj.__typename;

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(removeTypenameValues);
      } else if (typeof value === "object" && value !== null) {
        // Если ключ содержит "image", то делаем значение равным null
        if (key.includes("image") || key.includes("Image")) {
          obj[key] = null;
        } else {
          removeTypenameValues(value);
        }
      } else if (typeof value === "string") {
        // Удаляем все теги <img> с атрибутом data-image-id
        const regex = /<img[^>]*data-image-id="[^"]*"[^>]*>/gi;
        obj[key] = value.replace(regex, "");
      }
    });
  }

  return obj;
};

const downloadFile = (blob: Blob, pageName: string) => from(new Promise<void>((resolve) => {
  saveAs(blob, `${pageName}.json`);
  resolve();
}));

const exportBlockContentEpic: TCmsAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(exportBlockContentAction),
  mergeMap(
    ({ payload: { value, pageName, fieldPath } }) => queryEpicFactory(
      [EXPORT_BLOCK_CALL_SYMBOL, value],
      query_Cms_Blocks,
      {
        variables: {
          theme: getCMSContext(deps).cmsThemeSelector(state$.value),
          where: {
            predicate: EWhere_Predicate.eq,
            fieldPath,
            value,
          },
        },
        optionalFields: cmsBlocksQueryAdminUIOptionalFields,
      },
      (res) => {
        const edge = res.cms.Blocks[0];

        if (!edge || edge.content === null) {
          return of(appServiceShowErrorMessageAction(cmsui_general_message_thisPageHasNoContent));
        }

        const blob = new Blob(
          [
            JSON.stringify(
              removeTypenameValues(edge.content),
            ),
          ],
          { type: "application/json" },
        );

        return downloadFile(blob, pageName).pipe(() => of(appServiceShowSuccessMessageAction(cmsui_block_success_exportBlocks)));
      },
      cmsui_block_error_exportBlocks,
    )(action$, state$, deps),
  ),
);

export {
  exportBlockContentEpic,
  removeTypenameValues,
  downloadFile,
};
