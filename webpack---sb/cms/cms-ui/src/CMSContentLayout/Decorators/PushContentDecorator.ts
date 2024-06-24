import {
  every,
  type IWithFormsState,
  onAction,
  selectFieldValue,
  setFieldValueAction,
  setFormFieldValue,
  whenIs,
} from "@sb/form-new";
import { getNotNil } from "@sb/utils";
import { setFileFieldValueAction, type TFileFieldValue } from "@sb/file-service-extension";
import type { IRootDecorator } from "../../Model/Types";
import { isDeletedImage, isNotTextEditorFile } from "../Utils/DecoratorUtils";
import { type IFiles } from "../Model";
import { getFileIdsPath } from "../Utils/PathCreators";

const cmsAddFileIdDecorator =<State extends IWithFormsState> ({ activeTabSelector, pathSelector }: IRootDecorator) => [
  onAction<typeof setFileFieldValueAction, State>(
    setFileFieldValueAction,
    whenIs<typeof setFileFieldValueAction, State>(
      every(
        isNotTextEditorFile(),
      ),
      (state, action, next) => {
        const {
          payload: { value },
          metadata: { formName },
        } = action;

        const nonNullableValue = value ?? [];

        const activeTab = activeTabSelector(state);

        const path = pathSelector(state);

        const fileIdsPath = getFileIdsPath(path, activeTab);

        const prevIdsList = selectFieldValue<IFiles>(state, formName, fileIdsPath) ?? { files: [] };

        return setFormFieldValue(
          next(state, action),
          formName,
          fileIdsPath,
          {
            files: prevIdsList.files.concat(nonNullableValue),
          },
        );
      },
    ),
  ),
];

const cmsDeleteFileIdDecorator =<State extends IWithFormsState> ({ activeTabSelector, pathSelector }: IRootDecorator) => [
  onAction<typeof setFieldValueAction, State>(
    setFieldValueAction,
    whenIs<typeof setFieldValueAction, State>(
      every(
        isDeletedImage(),
      ),
      (state, action, next) => {
        const { payload: { fieldPath }, metadata: { formName } } = action;
        const nextState = next(state, action);

        const { files } = getNotNil(
          selectFieldValue.type<TFileFieldValue>()(state, formName, fieldPath),
          ["cmsDeleteFileIdDecorator"],
          "files",
        );

        const activeTab = activeTabSelector(state);

        const path = pathSelector(state);

        const fileIdsPath = getFileIdsPath(path, activeTab);

        const normalizedFileId = files.map(({ id }) => id);

        const filesIdsList = selectFieldValue<IFiles>(state, formName, fileIdsPath) ?? { files: [] };

        return setFormFieldValue(
          nextState,
          formName,
          fileIdsPath,
          {
            files: filesIdsList.files.filter(({ id }) => !normalizedFileId.includes(id)),
          },
        );
      },
    ),
  ),
];

export {
  cmsAddFileIdDecorator,
  cmsDeleteFileIdDecorator,
};
