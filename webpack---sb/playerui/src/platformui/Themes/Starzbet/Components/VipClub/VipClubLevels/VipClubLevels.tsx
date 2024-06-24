import { memo } from "react";
import { useSelector } from "react-redux";
import type { TPlatform_VipClubLevelRule_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  platformui_starzbet_vipClub_playerState_currentLevel_title,
  platformui_starzbet_vipClub_playerState_nextLevel_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withCondition } from "@sb/utils";
import classes from "./VipClubLevels.module.css";
import { PublicImage } from "../../../../../../common/Components/PublicImage";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import {
  vipClubNotNilPlayerStateLevelSelector,
  vipClubNotNilPlayerStateNextLevelSelector,
} from "../../../../../Store/VipClub/Selectors/VipClubPlayerStateSelectors";
import {
  vipClubNotNilPlayerLevelRuleSelector,
  vipClubNotNilPlayerNextLevelRuleSelector,
  vipClubPlayerNextLevelExistSelector,
} from "../../../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";

interface IVipClubPlayerStateLevelBaseProps {
  levelRule: TPlatform_VipClubLevelRule_Fragment;
  titleTKey: TTKeys;
  value: number;
}

const VipClubPlayerStateLevelBase = memo<IVipClubPlayerStateLevelBaseProps>(({ levelRule, titleTKey, value }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubLevel}>
      {
        levelRule.icon
          ? (
            <div className={classes.vipClubLevelImageContainer}>
              <PublicImage pathToFile={levelRule.icon.pathToFile} alt={"badge"} />
            </div>
          )
          : null
      }

      <div className={classes.vipClubLevelText}>
        <div className={classes.vipClubLevelTitle}>
          <Ellipsis>
            {t(titleTKey)}
          </Ellipsis>
        </div>

        <div className={classes.vipClubLevelValue}>
          <Ellipsis>
            <TranslateRecord record={levelRule.name} />

            &nbsp;

            {String(value)}
          </Ellipsis>
        </div>
      </div>
    </div>
  );
});
VipClubPlayerStateLevelBase.displayName = "VipClubPlayerStateLevelBase";

const VipClubCurrentLevel = memo(() => {
  const levelRule = useSelector(vipClubNotNilPlayerLevelRuleSelector);
  const playerLevel = useSelector(vipClubNotNilPlayerStateLevelSelector);

  return (
    <VipClubPlayerStateLevelBase
      titleTKey={platformui_starzbet_vipClub_playerState_currentLevel_title}
      levelRule={levelRule}
      value={playerLevel}
    />
  );
});
VipClubCurrentLevel.displayName = "VipClubCurrentLevel";

const VipClubNextLevel = withCondition(
  vipClubPlayerNextLevelExistSelector,
  memo(() => {
    const levelRule = useSelector(vipClubNotNilPlayerNextLevelRuleSelector);
    const playerLevel = useSelector(vipClubNotNilPlayerStateNextLevelSelector);

    return (
      <VipClubPlayerStateLevelBase
        value={playerLevel}
        titleTKey={platformui_starzbet_vipClub_playerState_nextLevel_title}
        levelRule={levelRule}
      />
    );
  }),
);
VipClubNextLevel.displayName = "VipClubNextLevel";

const VipClubCurrentAndNextLevels = memo(() => (
  <div className={classes.vipClubCurrentAndNextLevels}>
    <VipClubCurrentLevel />

    <VipClubNextLevel />
  </div>
));
VipClubCurrentAndNextLevels.displayName = "VipClubCurrentAndNextLevels";

export {
  VipClubCurrentAndNextLevels,
};
