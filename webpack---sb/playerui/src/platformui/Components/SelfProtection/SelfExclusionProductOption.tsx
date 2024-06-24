import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_selfExclusion_product_casino,
  platformui_selfExclusion_product_liveCasino,
  platformui_selfExclusion_product_sports,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { EProductCode } from "@sb/betting-core/EProductCode";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import { type TSelfExclusionProduct } from "../../Store/SelfProtection/Form/SelfExclusion/SelfExclusionFormModel";

const SELF_EXCLUSION_PRODUCT_TRANSLATE_MAP: Record<TSelfExclusionProduct, TCommonTKeys> = {
  [EProductCode.SPORTS]: platformui_selfExclusion_product_sports,
  [EProductCode.LIVE_CASINO]: platformui_selfExclusion_product_liveCasino,
  [EProductCode.CASINO]: platformui_selfExclusion_product_casino,
};

const SelfExclusionProductOption = memo<ISelectOption<TSelfExclusionProduct>>(({ value }) => {
  const [t] = useTranslation();

  return t(SELF_EXCLUSION_PRODUCT_TRANSLATE_MAP[value]);
});
SelfExclusionProductOption.displayName = "SelfExclusionProductOption";

export { SelfExclusionProductOption };
