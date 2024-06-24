import { type TProjectCode } from "@sb/sdk/common/cms/api/model/ProjectCode";
import {
  BLOCK_CONTENT,
  CMS_AFFILIATE_FORM_NAME,
  CMS_PLATFORM_FORM_NAME,
  EBlockTypeMap,
  isCorrectFormName,
  META_CONTENT,
  PAGE_CONTENT,
  STATE_WAS_CHANGED,
  type TFormNames,
  VARIABLES,
} from "@sb/cms-core";
import { getNotNil, isArray, isNil, type TAnyObject, type TExplicitAny, type TSelector } from "@sb/utils";
import { type TFieldPath } from "@sb/form-new";
import { type HttpRpcClient } from "@sb/network-bus/RpcClient";
import { type ICMSContext } from "../../Context/CMSContext";
import { type TCmsAppEpicDependencies, type TDefCreatorFn } from "../../Model/TCmsAppEpic";
import { type TCmsAppState } from "../../Model/TCmsAppState";

const projectCodeMap:Record<TFormNames, TProjectCode> = {
  [CMS_PLATFORM_FORM_NAME]: "PLATFORM",
  [CMS_AFFILIATE_FORM_NAME]: "AFFILIATE",
};

interface IPropWithPath {
  path?: TFieldPath;
}

interface IPropWithPathAndIndex extends IPropWithPath {
  index?: number;
}

const getProjectCodeByFormName = (formName: string): TProjectCode => {
  const projectCode = isCorrectFormName(formName) ? projectCodeMap[formName] : null;

  return getNotNil(projectCode, ["CMS", "getProjectCodeByFormName"], `FormName: "${formName}" doesnt exist in definitions`);
};

const getDepsWithFormNameAndDefCreatorFn =<State extends TCmsAppState = TCmsAppState>
  (
    deps: TCmsAppEpicDependencies<State>,
    formName: string,
    defCreatorFn: TDefCreatorFn<State>,
    context: ICMSContext,
    getRpcClient: (deps: TCmsAppEpicDependencies<State>) => HttpRpcClient,
    envCode: string,
    showDeletedVariablesSelector: TSelector<TExplicitAny, boolean>,
  ): TCmsAppEpicDependencies<State> => {
  deps.formName = formName;
  deps.context = context;
  deps.getRpcClient = getRpcClient;
  deps.defCreatorFn = defCreatorFn;
  deps.envCode = envCode;
  deps.showDeletedVariablesSelector = showDeletedVariablesSelector;

  return deps;
};

const isNilIndexes = (prev: IPropWithPathAndIndex, next: IPropWithPathAndIndex) => isNil(prev.index) && isNil(next.index);

const isEqualIndexes = (prev: IPropWithPathAndIndex, next: IPropWithPathAndIndex) => isNilIndexes(prev, next) || prev.index === next.index;

const isPathPropsAreEqual = (prev: IPropWithPath, next: IPropWithPath) => {
  const prevPath = prev.path;

  const nextPath = next.path;

  return isArray(prevPath) && isArray(nextPath)
    ? prevPath.join(".") === nextPath.join(".")
    : false;
};

const equalByIdAndPathProps = (prev: IPropWithPathAndIndex, next: IPropWithPathAndIndex) =>
  isPathPropsAreEqual(prev, next) && isEqualIndexes(prev, next);

const getMetaPageContentPath = (path: string[] | TFieldPath) => path.concat(PAGE_CONTENT, BLOCK_CONTENT, META_CONTENT);

const getPageContentPath = (path: string[] | TFieldPath) => path.concat(PAGE_CONTENT, BLOCK_CONTENT);

const getPathToContent = (path: string[] | TFieldPath, activeTab: EBlockTypeMap) =>
  activeTab === EBlockTypeMap.PAGES ? path.concat(PAGE_CONTENT) : path;

const getStateWasChangedPath = (activeTab: EBlockTypeMap, path: TFieldPath) => {
  if (activeTab === EBlockTypeMap.VARIABLES) {
    return [VARIABLES, STATE_WAS_CHANGED];
  }

  if (activeTab === EBlockTypeMap.PAGES) {
    return path.concat(PAGE_CONTENT, STATE_WAS_CHANGED);
  }

  return path.concat(STATE_WAS_CHANGED);
};

const isRecordHaveFieldsExcludedCurrent = <T extends TAnyObject>(obj: T, fieldsList: (keyof  T)[]) => {
  const keys = Object.keys(obj);

  return keys.some((key) => !fieldsList.includes(key));
};

export {
  isRecordHaveFieldsExcludedCurrent,
  getPathToContent,
  getStateWasChangedPath,
  getPageContentPath,
  getMetaPageContentPath,
  equalByIdAndPathProps,
  isPathPropsAreEqual,
  getProjectCodeByFormName,
  getDepsWithFormNameAndDefCreatorFn,
};

