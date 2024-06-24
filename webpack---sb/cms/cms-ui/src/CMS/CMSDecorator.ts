import type { ActionCreator } from "redux";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState } from "@sb/form-new";
import { cmsListDecorator } from "../CMSContentLayout/Components/CMSListContainer/CmsListDecorator";
import { cmsMediaInputUrlDecorator } from "../CMSContentLayout/Components/CMSMediaType/CMSMediaInputUrl/CmsMediaInputUrlDecorator";
import {
  cmsAddFileIdDecorator,
  cmsDeleteFileIdDecorator,
} from "../CMSContentLayout/Decorators/PushContentDecorator";
import { deleteItemListDecorator } from "../CMSContentLayout/Components/CMSListContainer/DeleteItemListDecorator";
import { type ICMSContext } from "../Context/CMSContext";
import { cmsStateWasChangedDecorator } from "./CMSStateWasChangedDecorator";

const createCMSRootDecorator =
  <State extends IWithFormsState> (context: ICMSContext):IDecoratorDefinition<ActionCreator<IFormAction>, State>[] => {
    const decoratorContext = { activeTabSelector: context.activeTabSelector, pathSelector: context.pathSelector };

    return [
      ...cmsListDecorator<State>(decoratorContext),
      ...cmsStateWasChangedDecorator<State>(decoratorContext),
      ...cmsMediaInputUrlDecorator<State>(),
      ...deleteItemListDecorator<State>(decoratorContext),
      ...cmsAddFileIdDecorator<State>(decoratorContext),
      ...cmsDeleteFileIdDecorator<State>(decoratorContext),
    ];
  };

export { createCMSRootDecorator };
