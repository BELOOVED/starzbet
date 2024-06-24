import { createPortal } from "react-dom";
import { type FC, type PropsWithChildren, useLayoutEffect, useState } from "react";
import { isNil, isNotNil } from "@sb/utils";
import { createDivWithIdAndAppendToBody } from "../../Utils/ComponentsUtils/CreateDivWithIdAndAppendToBody";

const MODALS_ROOT_ID = "modals-root";

type TPortalProps = PropsWithChildren<{ rootId?: string; }>

const Portal: FC<TPortalProps> = ({ children, rootId = MODALS_ROOT_ID }) => {
  const [modalsRootElement, setWrapperElement] = useState<null | HTMLElement>(null);

  useLayoutEffect(
    () => {
      let domElement = document.getElementById(rootId);
      let isCreated = false;
      if (isNil(domElement)) {
        isCreated = true;
        domElement = createDivWithIdAndAppendToBody(rootId);
      }

      setWrapperElement(domElement);

      return () => {
        if (isCreated && domElement) {
          domElement.remove();
        }
      };
    },
    [rootId],
  );

  return isNotNil(modalsRootElement) ? createPortal(children, modalsRootElement) : <>{children}</>;
};
Portal.displayName = "Portal";

export { Portal, MODALS_ROOT_ID };
