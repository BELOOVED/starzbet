import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { withCondition } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "../RegistrationConsent/RegistrationConsent.module.css";
import type { TFieldChildProps } from "../../../../../../../common/Components/Field/FieldCreator";
import { TranslateRecord } from "../../../../../../Components/TranslateRecord/TranslateRecord";
import { platformBonusesSelectors } from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { isRegistrationBonusesLoadedAndNotEmpty } from "../../../../../../Store/Bonuses/Selectors/RegistrationBonusesSelectors";
import { CheckedIcon } from "../../../../Components/Icons/CheckedIcon/CheckedIcon";

const WelcomeBonus = withCondition(
  isRegistrationBonusesLoadedAndNotEmpty,
  memo<TFieldChildProps<string>>(({ disabled, onChange, value }) => {
    const bonuses = useSelector(platformBonusesSelectors.registrationBonuses);

    const handler = (id: string) => () => {
      onChange(id !== value ? id : undefined);
    };

    return (
      <div className={classes.wrapper}>
        {
          bonuses.map(({ name, id }) => (
            <label className={classes.bonusLabel} key={id}>
              <input
                type={"checkbox"}
                className={classes.input}
                onChange={handler(id)}
                checked={value === id}
                disabled={disabled}
              />

              <span
                className={clsx(classes.checkbox)}
                {...qaAttr(PlayerUIQaAttributes.SignUpPage.GetWelcomeBonusCheckbox)}
              >
                <CheckedIcon width={10} height={8} />
              </span>

              <div className={classes.title}>
                <Ellipsis>
                  <span>
                    <TranslateRecord record={name} />
                  </span>
                </Ellipsis>
              </div>
            </label>
          ))
        }
      </div>
    );
  }),
);
WelcomeBonus.displayName = "WelcomeBonus";

export { WelcomeBonus };
