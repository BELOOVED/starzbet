import { type FC, type PropsWithChildren } from "react";
import classes from "./BonusPageLayout.module.css";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { BonusTabs } from "../BonusTabs/BonusTabs";

const BonusPageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Space value={8} vertical>
    <BonusTabs />

    <div className={classes.contentWrapper}>
      {children}
    </div>
  </Space>
);
BonusPageLayout.displayName = "BonusPageLayout";

const CardsWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Space value={8} vertical className={classes.cardsWrapper}>{children}</Space>
);
CardsWrapper.displayName = "CardsWrapper";

export { BonusPageLayout, CardsWrapper };
