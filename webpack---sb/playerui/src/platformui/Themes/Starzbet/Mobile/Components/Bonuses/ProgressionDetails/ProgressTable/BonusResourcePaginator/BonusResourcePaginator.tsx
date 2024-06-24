import { memo, useCallback } from "react";
import { type TVoidFn, useAction } from "@sb/utils";
import { type EBonusProductEnum, type EPlatform_PlayerBonusPhaseEnum, type TPageInfo_Fragment } from "@sb/graphql-client";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_progressionTable_paginator_next,
  platformui_starzbet_bonus_progressionTable_paginator_prev,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./BonusResourcePaginator.module.css";
import {
  deprecatedBonusesBonusResourcesTableMountedAction,
} from "../../../../../../../../Store/Bonuses/BonusesActions";

interface IPaginatorProps {
  onNext: TVoidFn;
  onPrev: TVoidFn;
  pageInfo?: TPageInfo_Fragment;
}

const Paginator = memo<IPaginatorProps>(({ pageInfo, onNext, onPrev }) => {
  const [t] = useTranslation();

  if (!pageInfo) {
    return null;
  }

  return (
    <div className={classes.paginatorRow}>
      <button
        onClick={onPrev}
        disabled={!pageInfo.hasPreviousPage}
        className={classes.paginatorButton}
      >
        {t(platformui_starzbet_bonus_progressionTable_paginator_prev)}
      </button>

      <button
        onClick={onNext}
        disabled={!pageInfo.hasNextPage}
        className={classes.paginatorButton}
      >
        {t(platformui_starzbet_bonus_progressionTable_paginator_next)}
      </button>
    </div>
  );
});
Paginator.displayName = "Paginator";

interface IBonusResourcePaginatorProps {
  id: string;
  pageInfo?: TPageInfo_Fragment;
  phase?: EPlatform_PlayerBonusPhaseEnum;
  product?: EBonusProductEnum;
}

const BonusResourcePaginator = memo<IBonusResourcePaginatorProps>(({
  product,
  phase,
  pageInfo,
  id,
}) => {
  const loadResources = useAction(deprecatedBonusesBonusResourcesTableMountedAction);

  const onPrev = useCallback(() => loadResources(id, phase, product, true, false), [id, product, phase]);
  const onNext = useCallback(() => loadResources(id, phase, product, false, true), [id, product, phase]);

  return (
    <Paginator pageInfo={pageInfo} onNext={onNext} onPrev={onPrev} />
  );
});
BonusResourcePaginator.displayName = "BonusResourcePaginator";

export { BonusResourcePaginator };
