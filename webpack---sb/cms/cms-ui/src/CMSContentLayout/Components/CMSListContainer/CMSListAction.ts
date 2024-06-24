import { type TFieldPath } from "@sb/form-new";
import { cmsActionType } from "../../../CMS/Model/CMSActionType";

const addOneOfBlockAction = (formName: string, fieldPath: TFieldPath, value: string) => ({
  type: cmsActionType("ADD_ONE_OF_CHILD"),
  payload: { fieldPath, value },
  metadata: { formName },
});
const addBlockAction = (formName: string, fieldPath: TFieldPath) => ({
  type: cmsActionType("ADD_BLOCK"),
  payload: { fieldPath },
  metadata: { formName },
});
export { addBlockAction, addOneOfBlockAction };
