import type { FC, PropsWithChildren } from "react";
import { isNil, type TVoidFn } from "@sb/utils";
import { isLocalizedRoutePath } from "../../../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedPathWithFallback";
import {
  getLocalizedPathPatternByRoute,
} from "../../../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedPathPatternByRoute";
import { Link } from "../../../../../../common/Themes/Starzbet/Components/Link/Link";
import { isExternalLink, isStartWithSlash } from "../../../../../Store/CMS/Utils/Helpers";
import { LinkBlank } from "../../../../../Components/LinkBlank/LinkBlank";

interface IBonusesButton {
  to: string | null;
  onClick: TVoidFn;
  className?: string;
}

const BonusesButton:FC<PropsWithChildren & IBonusesButton> = ({
  children,
  onClick,
  className,
  to,
}) => {
  if (isNil(to)) {
    return null;
  }
  if (isExternalLink(to)) {
    return (
      <LinkBlank onClick={onClick} className={className} href={to}>
        {children}
      </LinkBlank>
    );
  }

  if (!isStartWithSlash(to)) {
    return null;
  }

  const link = isLocalizedRoutePath(to) ? to : getLocalizedPathPatternByRoute(to);

  return (
    <Link
      colorScheme={"grey"}
      wide
      onClick={onClick}
      className={className}
      to={link}
    >
      {children}
    </Link>
  );
};
BonusesButton.displayName = "BonusesButton";

export { BonusesButton };
