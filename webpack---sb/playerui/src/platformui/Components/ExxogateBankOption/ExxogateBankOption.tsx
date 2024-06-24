import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import type { ISelectOption } from "../../../common/Components/Field/SelectModel";
import { exxogateBankNameByIdSelector } from "../../Store/Banking/Form/Exxogate/ExxogateFormSelectors";

const ExxogateBankOption = memo<ISelectOption<string>>(({ value }) => useParamSelector(exxogateBankNameByIdSelector, [value]));
ExxogateBankOption.displayName = "ExxogateBankOption";

export { ExxogateBankOption };
