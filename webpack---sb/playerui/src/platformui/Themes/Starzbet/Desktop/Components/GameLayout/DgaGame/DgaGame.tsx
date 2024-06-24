import clsx from "clsx";
import { type FC, memo, type PropsWithChildren } from "react";
import { isNil, useParamSelector } from "@sb/utils";
import classes from "./DgaGame.module.css";
import { UserIcon } from "../../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/UserIcon/UserIcon";
import { dgaInfoByTableIdSelector } from "../../../../../../Store/PragmaticDga/Selectors/PragmaticDgaSelectors";
import { useDgaGameMount } from "../../../../../../Store/PragmaticDga/Hooks/UseDgaGameMount";

interface IUsersCountWrapper {
  count: number;
}

interface IContentProps extends IWithId, PropsWithChildren {
  isMobile: boolean;
}

const UsersCount = memo<IUsersCountWrapper>(({ count }) => (
  <div className={classes.onlinePlayers}>
    <UserIcon />

    <span>{count}</span>
  </div>
));
UsersCount.displayName = "UsersCount";

const Content: FC<IContentProps> = ({ id, children, isMobile = false }) => {
  const info = useParamSelector(dgaInfoByTableIdSelector, [id]);

  if (isNil(info)) {
    return children;
  }

  return (
    <>
      <div className={clsx(classes.overlay, isMobile && classes.zIndex)}>
        <UsersCount count={info.totalSeatedPlayers} />
      </div>

      {children}
    </>
  );
};
Content.displayName = "Content";

const NewPragmaticGame: FC<IContentProps> = memo((props) => {
  useDgaGameMount();

  return (
    <Content {...props} />
  );
});
NewPragmaticGame.displayName = "NewPragmaticGame";

interface IEnhancedGame extends PropsWithChildren {
  isMobile?: boolean;
  id: string | undefined;
  withDga?: boolean;
}

const DgaGame: FC<IEnhancedGame> = ({
  children,
  id,
  isMobile = false,
  withDga,
}) => {
  if (!withDga || isNil(id)) {
    return children;
  }

  return (
    <NewPragmaticGame id={id} isMobile={isMobile}>
      {children}
    </NewPragmaticGame>
  );
};
DgaGame.displayName = "DgaGame";

export { DgaGame };
