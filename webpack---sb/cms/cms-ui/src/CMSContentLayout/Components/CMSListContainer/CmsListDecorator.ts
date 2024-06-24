import { every, type IWithFormsState, onAction, whenIs } from "@sb/form-new";
import type { IRootDecorator } from "../../../Model/Types";
import { isNumberOfPathAreEqual } from "../../Utils/DecoratorUtils";
import { addBlockAction, addOneOfBlockAction } from "./CMSListAction";
import { addListElementHandler, newTagsListHandler } from "./CmsListHandlers";

const cmsListDecorator = <State extends IWithFormsState>({  pathSelector }: IRootDecorator) => [
  onAction(addOneOfBlockAction, addListElementHandler<State>()),
  onAction(addBlockAction, addListElementHandler<State>()),
  onAction<typeof addBlockAction, State>(
    addBlockAction,
    whenIs<typeof addBlockAction, State>(
      every(
        isNumberOfPathAreEqual("tags", -2),
      ),
      newTagsListHandler(pathSelector, true),
    ),
  ),
];

export { cmsListDecorator };
