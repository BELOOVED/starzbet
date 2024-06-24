import { type DetailedHTMLProps, type FC, type HTMLAttributes, type PropsWithChildren } from "react";
import { useTopWinnerOpenGame } from "../../Store/TopWinners/Hooks/UseTopWinnerOpenGame";

type TWithOpenGameContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & IWithId

const WithOpenGameContainer: FC<PropsWithChildren<TWithOpenGameContainerProps>> = ({
  id,
  children,
  ...props
}) => {
  const openGame = useTopWinnerOpenGame(id);

  return (
    <div onClick={openGame} {...props}>
      {children}
    </div>
  );
};
WithOpenGameContainer.displayName = "WithOpenGameContainer";

export { WithOpenGameContainer };
