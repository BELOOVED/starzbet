import { every, isFormFieldPath, isFormName, onAction, selectFieldValue, setFieldValue, setFieldValueAction, whenIs } from "@sb/form-new";
import { type IMoney } from "@sb/utils";
import { type TDecorator } from "../../Form/Utils/FormResetDecorator";
import { isDepositPromoBonusSelectedAndMatched } from "../../Bonuses/Selectors/DepositPromotionBonusesSelectors";
import { DEPOSIT_FORM } from "../Utils/Variables";
import { DEPOSIT_BASE_FIELD_PATHS } from "./BaseFormModel";

const depositFormBonusFieldDecorator: TDecorator =
  onAction(
    setFieldValueAction<IMoney>,
    whenIs(
      every(
        isFormName(DEPOSIT_FORM),
        isFormFieldPath(DEPOSIT_BASE_FIELD_PATHS.amount),
      ),
      (state, action, next) => {
        const { payload: { value }, metadata: { formName } } = action;

        let nextState = next(state, action);
        const selectedBonus = selectFieldValue<string>(nextState, formName, DEPOSIT_BASE_FIELD_PATHS.depositPromotionBonusId);

        const isMatched = isDepositPromoBonusSelectedAndMatched(nextState, selectedBonus, value);

        if (!isMatched) {
          nextState = setFieldValue(
            nextState,
            DEPOSIT_BASE_FIELD_PATHS.depositPromotionBonusId,
            undefined,
            formName,
          );
        }

        return nextState;
      },
    ),
  );

export { depositFormBonusFieldDecorator };
