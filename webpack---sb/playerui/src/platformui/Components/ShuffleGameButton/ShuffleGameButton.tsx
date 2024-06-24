import { type FC, type ReactElement } from "react";
import { useSelector } from "react-redux";
import { isString, type TVoidFn, useAction, useParamSelector, voidFn } from "@sb/utils";
import { callManagerStartedSelector, callManagerWasSucceededSelector } from "@sb/call-manager";
import { loggedSelector } from "@sb/auth";
import { LOADING_SHUFFLE_GAME_SYMBOL } from "../../Store/Games/Epics/ShuffleGameEpic";
import { useOpenGame } from "../../Hooks/UseOpenGame";
import { openShuffleGameAction } from "../../Store/Games/Actions/GamesActions";
import { type IWithGamePage } from "../../Store/Games/Model/Games";
import { shuffleGameSelector } from "../../Store/Games/Selectors/GamesSelectors";

interface IShuffleGameButtonProps extends IWithGamePage {
  children: (onClick: TVoidFn, disabled: boolean) => ReactElement;
}

const ShuffleGameButtonBase: FC<IShuffleGameButtonProps & IWithId> = ({ children, id, page }) => {
  const loading = useParamSelector(callManagerStartedSelector, [LOADING_SHUFFLE_GAME_SYMBOL]);
  const open = useOpenGame(id);
  const replaceId = useAction(openShuffleGameAction);

  const onClick = () => {
    open();
    replaceId(page);
  };

  return children(onClick, loading);
};
ShuffleGameButtonBase.displayName = "ShuffleGameButtonBase";

interface IWithHideIfEmpty {
  hideIfEmpty?: boolean;
}

const ShuffleGameButton: FC<IShuffleGameButtonProps & IWithHideIfEmpty> = ({ children, hideIfEmpty, ...props }) => {
  const logged = useSelector(loggedSelector);
  const succeeded = useParamSelector(callManagerWasSucceededSelector, [LOADING_SHUFFLE_GAME_SYMBOL]);
  const id = useSelector(shuffleGameSelector[props.page]);

  if(logged && succeeded && isString(id)) {
    return (
      <ShuffleGameButtonBase {...props} id={id}>
        {children}
      </ShuffleGameButtonBase>
    );
  }

  return hideIfEmpty ? null : children(voidFn, true);
};
ShuffleGameButton.displayName = "ShuffleGameButton";

export { ShuffleGameButton };
