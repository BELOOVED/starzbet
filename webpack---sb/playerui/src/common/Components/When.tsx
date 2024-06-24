import { type FC, type PropsWithChildren } from "react";

interface IWhenProps {
  condition: boolean;
}

const When: FC<PropsWithChildren<IWhenProps>> = ({ condition, children }) => condition ? <>{children}</> : null;
When.displayName = "When";

export { When };
