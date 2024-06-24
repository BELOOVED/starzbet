import type { ActionCreator } from "redux";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState, type TFormExtension } from "@sb/form-new";
import { ECmsPuiThemes } from "@sb/cms-config";
import { taxonomyCreator } from "./TaxonomyCreator/TaxonomyCreator";
import {
  affiliateTaxonomy,
  bayWinPlatformTaxonomy,
  betOrSpinPlatformTaxonomy,
  betPublicPlatformTaxonomy,
  byCasinoPlatformTaxonomy,
  starzBetPlatformTaxonomy,
  zlotPlatformTaxonomy,
} from "./TaxonomyCreator/CMSTaxonomy";

const betOrSpinPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(betOrSpinPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeOne,
    });

const starzBetPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(starzBetPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeTwo,
    });

const betPublicPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(betPublicPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeFour,
    });

const byCasinoPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(byCasinoPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeFive,
    });

const bayWinPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(bayWinPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeThree,
    });

const zlotPlatformCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(zlotPlatformTaxonomy(), decorator, extensions),
      theme: ECmsPuiThemes.themeSix,
    });

const affiliateCMSFormDefinitions = <State extends IWithFormsState>
  (decorator: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) =>
    ({
      ...taxonomyCreator<State>(affiliateTaxonomy(), decorator, extensions),
      theme: "",
    });

const getPlatformFormDefinitions = <State extends IWithFormsState>
  (decorators: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) => [
    betOrSpinPlatformCMSFormDefinitions(decorators, extensions),
    starzBetPlatformCMSFormDefinitions(decorators, extensions),
    bayWinPlatformCMSFormDefinitions(decorators, extensions),
    betPublicPlatformCMSFormDefinitions(decorators, extensions),
    byCasinoPlatformCMSFormDefinitions(decorators, extensions),
    zlotPlatformCMSFormDefinitions(decorators, extensions),
  ];

const getAllFormDefinitions = <State extends IWithFormsState>
  (decorators: IDecoratorDefinition<ActionCreator<IFormAction>, State>[] = [], extensions: TFormExtension<State>[] = []) => [
    affiliateCMSFormDefinitions(decorators, extensions),
  ].concat(getPlatformFormDefinitions(decorators, extensions));

const CMS_PLATFORM_FORM_DEFINITIONS = getPlatformFormDefinitions();

const CMS_FORM_DEFINITIONS = getAllFormDefinitions();

export {
  getPlatformFormDefinitions,
  CMS_PLATFORM_FORM_DEFINITIONS,
  CMS_FORM_DEFINITIONS,
  zlotPlatformCMSFormDefinitions,
  byCasinoPlatformCMSFormDefinitions,
  betPublicPlatformCMSFormDefinitions,
  bayWinPlatformCMSFormDefinitions,
  starzBetPlatformCMSFormDefinitions,
  affiliateCMSFormDefinitions,
  betOrSpinPlatformCMSFormDefinitions,
};
