import { type AnchorHTMLAttributes, memo } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";

const LinkBlank = memo<AnchorHTMLAttributes<HTMLAnchorElement> & IWithQaAttribute>(({ qaAttribute, ...rest }) => (
  <a
    target={"_blank"}
    rel={"noopener noreferrer"}
    {...rest}
    {...qaAttr(qaAttribute)}
  />
));
LinkBlank.displayName = "LinkBlank";

export { LinkBlank };
