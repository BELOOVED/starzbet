import { type ComponentType, createElement, memo } from "react";
import { getNotNil, type TAnyObject, type TExplicitAny, withProps } from "@sb/utils";
import { FormWithWrapper } from "@sb/form-new";
import { CREATE_CALL_REQUEST_FORM_NAME } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { FormSubmitResultFactory, type IFormSubmitResultFactoryProps } from "../FormSubmitResultFactory";
import type {
  ICreateCallRequestContactInfoFieldFactoryProps,
  ICreateCallRequestFormCallOptionNameFieldFactoryProps,
  ICreateCallRequestFormDepartmentFieldFactoryProps,
  ICreateCallRequestFormDescriptionFieldFactoryProps,
  ICreateCallRequestFormSlotIdFieldFactoryProps,
  ICreateCallRequestFormSubmitButtonFactoryProps,
  ICreateCallRequestSlotDateFieldFactoryProps,
} from "./CreateCallRequestFormFactoryModel";
import { CreateCallRequestFormSlotDateFieldFactory } from "./CreateCallRequestFormSlotDateFieldFactory";
import { CreateCallRequestFormDepartmentFieldFactory } from "./CreateCallRequestFormDepartmentFieldFactory";
import { CreateCallRequestFormSlotIdFieldFactory } from "./CreateCallRequestFormSlotIdFieldFactory";
import { CreateCallRequestFormCallOptionNameFieldFactory } from "./CreateCallRequestFormCallOptionNameFieldFactory";
import { CreateCallRequestContactInfoFieldFactory } from "./CreateCallRequestContactInfoFieldFactory";
import { CreateCallRequestFormDescriptionFieldFactory } from "./CreateCallRequestFormDescriptionFieldFactory";
import { CreateCallRequestFormSubmitButtonFactory } from "./CreateCallRequestFormSubmitButtonFactory";

interface ICreateCallRequestFormFactoryProps {
  slotDateField: ICreateCallRequestSlotDateFieldFactoryProps;
  departmentField: ICreateCallRequestFormDepartmentFieldFactoryProps;
  slotIdField: ICreateCallRequestFormSlotIdFieldFactoryProps;
  callOptionNameField: ICreateCallRequestFormCallOptionNameFieldFactoryProps;
  contactInfoField: ICreateCallRequestContactInfoFieldFactoryProps;
  descriptionField: ICreateCallRequestFormDescriptionFieldFactoryProps;
  submitButton: ICreateCallRequestFormSubmitButtonFactoryProps;
  submitResult: IFormSubmitResultFactoryProps;
  fallbackContent?: ComponentType<TAnyObject>;
}

const KEY_TO_FACTORY_MAP: Record<string, ComponentType<TExplicitAny>> = {
  slotDateField: CreateCallRequestFormSlotDateFieldFactory,
  departmentField: CreateCallRequestFormDepartmentFieldFactory,
  slotIdField: CreateCallRequestFormSlotIdFieldFactory,
  callOptionNameField: CreateCallRequestFormCallOptionNameFieldFactory,
  contactInfoField: CreateCallRequestContactInfoFieldFactory,
  descriptionField: CreateCallRequestFormDescriptionFieldFactory,
  submitButton: CreateCallRequestFormSubmitButtonFactory,
  submitResult: FormSubmitResultFactory,
};

const CreateCallRequestFormContent = memo<ICreateCallRequestFormFactoryProps>(
  (props) =>
    Object.entries(props).map(
      ([key, value]) =>
        createElement(
          getNotNil(
            KEY_TO_FACTORY_MAP[key],
            ["CreateCallRequestFormContent"],
            "Factory",
          ),
          { ...value, key },
        ),
    ),
);
CreateCallRequestFormContent.displayName = "CreateCallRequestFormContent";

const CreateCallRequestFormFactory = memo<ICreateCallRequestFormFactoryProps>(({ fallbackContent, ...props }) => (
  <FormWithWrapper
    formName={CREATE_CALL_REQUEST_FORM_NAME}
    content={withProps(CreateCallRequestFormContent)(props)}
    fallbackContent={fallbackContent}
  />
));
CreateCallRequestFormFactory.displayName = "CreateCallRequestFormFactory";

export { CreateCallRequestFormFactory };
