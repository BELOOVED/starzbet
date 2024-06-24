import { combineEpics } from "redux-observable";
import { pushMetaContentEpic, validationPageAndMetaContentsEpic } from "../../CMSContentLayout/Epics/PushMetaContentEpic";
import { addPageEpic } from "./AddPageEpic";
import { changePageEpic } from "./ChangePageEpic";
import { mountPagesEpic } from "./MountPagesEpic";
import { deletePageEpic } from "./DeletePageEpic";
import { loadPagesRootEpic } from "./LoadPagesRootEpic";
import { changePagePriorityEpic } from "./ChangePagePriorityEpic";

const rootPageEpic = combineEpics(
  addPageEpic,
  changePageEpic,
  loadPagesRootEpic,
  mountPagesEpic,
  deletePageEpic,
  changePagePriorityEpic,
  pushMetaContentEpic,
  validationPageAndMetaContentsEpic,
);

export { rootPageEpic };
