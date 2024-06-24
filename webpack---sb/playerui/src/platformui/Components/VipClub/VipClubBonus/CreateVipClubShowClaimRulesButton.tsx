import { type ComponentType, memo, type PropsWithChildren, type ReactNode } from "react";
import { useTranslation } from "@sb/translator";
import { type TVoidFn, useActionWithBind } from "@sb/utils";
import { BaseModalCreator } from "../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { type IWithTKey } from "../../../../common/IWith";
import { detailedAvailableBonusRequestedAction } from "../../../Store/Bonuses/BonusesActions";

interface ICreateVipClubShowClaimRulesButton<T extends string> extends IWithTKey<T> {
  Button: ComponentType<PropsWithChildren & { onClick?: TVoidFn; }>;
  createClaimRulesModal: (bonusId: string) => (hideModal: TVoidFn) => ReactNode;
}

const createVipClubShowClaimRulesButton = <T extends string>({
  Button,
  tKey,
  createClaimRulesModal,
}: ICreateVipClubShowClaimRulesButton<T>) => memo<IWithId>(({ id }) => {
  const [t] = useTranslation();

  const requestDetailedAvailableBonus = useActionWithBind(detailedAvailableBonusRequestedAction, id);

  return (
    <BaseModalCreator modal={createClaimRulesModal(id)}>
      {
        (toggle) => {
          const onClick = () => {
            toggle();
            requestDetailedAvailableBonus();
          };

          return (
            <Button onClick={onClick}>
              {t(tKey)}
            </Button>
          );
        }
      }
    </BaseModalCreator>
  );
});

export { createVipClubShowClaimRulesButton };
