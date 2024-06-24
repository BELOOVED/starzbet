import clsx from "clsx";
import { type ComponentProps, type ComponentType, createElement, type JSX, type FC, type PropsWithChildren, type ReactNode, useCallback, useEffect, useReducer } from "react";
import { type TExplicitAny, type TVoidFn, not } from "@sb/utils";
import classes from "./ModalCreator.module.css";
import { noop } from "../../../../../../sportsbookui/Utils/Noop";

const ESC_KEY = "Escape";

interface IHandleEscapeHOC {
  onEsc: TVoidFn;
}

const HandleEscapeHOC: FC<PropsWithChildren<IHandleEscapeHOC>> = ({ onEsc, children }) => {
  const handleEscape = (e) => {
    if (e.key === ESC_KEY) {
      onEsc();
    }
  };

  useEffect(
    () => {
      document.addEventListener("keydown", handleEscape);

      return () => document.removeEventListener("keydown", handleEscape);
    },
    [],
  );

  return createElement("div", null, children);
};
HandleEscapeHOC.displayName = "HandleEscapeHOC";

interface IModalCreatorComponentProps {
  onSucceed: TVoidFn;
  onCancel: TVoidFn;
  closeButton: JSX.Element;
}

type TModalCreatorProps<T = ComponentProps<TExplicitAny>> = T & {
  component: ComponentType<IModalCreatorComponentProps & T>;
  childrenContainerClassName?: string;
  defaultOpen?: boolean;
  onClose?: TVoidFn;
  children?: (toggleModal: TVoidFn) => ReactNode;
  /**
   * Temporary crutch to make persist modal for maintenance
   */
  persist?: boolean;
}

const ModalCreator: FC<TModalCreatorProps> = (
  {
    children,
    component,
    childrenContainerClassName,
    defaultOpen = false,
    onClose = noop,
    persist,
    ...props
  },
) => {
  const [modal, toggleModal] = useReducer(not<boolean>, defaultOpen);

  const handleClose = useCallback(
    () => {
      if (persist) {
        return;
      }

      if (modal) {
        toggleModal();
        onClose();
      }
    },
    [persist, modal, onClose],
  );

  const closeButton = <div className={classes.closeButton} onClick={handleClose} />;

  return (
    <>
      {children && children(toggleModal)}

      {
        modal && (
          <div className={classes.modalContainer}>
            <div className={classes.overlay} onClick={handleClose} />

            <div className={clsx(classes.childrenContainer, childrenContainerClassName)}>
              {
                createElement(
                  HandleEscapeHOC,
                  { onEsc: handleClose },
                  createElement(
                    component,
                    {
                      ...props,
                      onSucceed: toggleModal,
                      onCancel: toggleModal,
                      closeButton: persist ? undefined : closeButton,
                    },
                  ),
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
};
ModalCreator.displayName = "ModalCreator";

export type { IModalCreatorComponentProps };
export { ModalCreator };
