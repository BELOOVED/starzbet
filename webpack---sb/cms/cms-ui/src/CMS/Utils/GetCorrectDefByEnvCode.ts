import { assocPath } from "ramda";
import { BLOCK_TYPE, EPlatformBlockMap, type IDefByTaxonomy } from "@sb/cms-core";
import { isDev, isE2E } from "@sb/utils";
import { createForm, type IWithFormsState } from "@sb/form-new";

const PATH_TO_TEST_DEF = ["def", "fields", BLOCK_TYPE, "fields", EPlatformBlockMap.E2ETest];

const getCorrectDefByEnvCode = <State extends IWithFormsState>(environmentCode: string, def: IDefByTaxonomy<State>) => {
  const { testDefinitions, mainDefinitions } = def;
  const isStagingOrLocal = isE2E || isDev || (/^STG_|^DEMO_|^DEV_/.exec(environmentCode));

  const initialForm = createForm(mainDefinitions);

  return isStagingOrLocal || environmentCode === "affiliate"
    ? assocPath(PATH_TO_TEST_DEF, testDefinitions, initialForm)
    : initialForm;
};

export { getCorrectDefByEnvCode };
