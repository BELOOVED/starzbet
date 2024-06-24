import { type ComponentType, createElement, memo } from "react";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { useTranslation } from "@sb/translator";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import {
  type TExplicitAny,
  type TNullable,
  type TTranslateItem,
  type TTranslateRecord,
  useParamSelector,
} from "@sb/utils";
import { type EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { outcomeByIdNotNilSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { Ellipsis } from "../Ellipsis/Ellipsis";
import { TranslateName } from "../TranslateName/TranslateName";

interface IParsedParameters extends Record<string, TExplicitAny> {
  ["@kind"]?: EOutcomeKind | string;
  name?: string;
  outcome?: EOutcomeEnumValue;
}

interface IWithParsedParameters {
  parameters: IParsedParameters;
  translatesForManuallyCreated?: TNullable<TTranslateRecord | TTranslateItem[]>;
}

const NameComponent = memo<IWithParsedParameters>(({ parameters, translatesForManuallyCreated }) => {
  if (translatesForManuallyCreated) {
    return <TranslateName name={translatesForManuallyCreated} />;
  }

  return parameters.name ? parameters.name : null;
});
NameComponent.displayName = "NameComponent";

const EnumComponent = memo<IWithParsedParameters>(({ parameters }) => {
  const [t] = useTranslation();

  return parameters.outcome ? t(outcomeEnumValueTKeys[parameters.outcome]) : null;
});
EnumComponent.displayName = "EnumComponent";

const names: Partial<Record<EOutcomeKind | string, ComponentType<IWithParsedParameters>>> = {
  [EOutcomeKind._name]: NameComponent,
  [EOutcomeKind.custom]: NameComponent,
  [EOutcomeKind.enum]: EnumComponent,
};

const OutrightOutcomeNameByParameters = memo<IWithParsedParameters>(({ parameters, translatesForManuallyCreated }) => {
  const component = parameters["@kind"] && names[parameters["@kind"]];

  return component
    ? <Ellipsis>{createElement(component, { parameters, translatesForManuallyCreated })}</Ellipsis>
    : null;
});
OutrightOutcomeNameByParameters.displayName = "OutrightOutcomeNameByParameters";

const OutrightOutcomeName = memo<IWithId>(({ id }) => {
  const outcome = useParamSelector(outcomeByIdNotNilSelector, [id]);

  return (
    <OutrightOutcomeNameByParameters
      parameters={outcome.parameters}
      translatesForManuallyCreated={outcome.translatesForManuallyCreated}
    />
  );
});
OutrightOutcomeName.displayName = "OutrightOutcomeName";

export { OutrightOutcomeNameByParameters, OutrightOutcomeName };
