import { type FC, type ReactNode, useState } from "react";
import { isNotNil, not, type TVoidFn } from "@sb/utils";

type TWithHideModal = {
  hideModal: TVoidFn;
}

type TBaseModalCreatorProps = {
  children?: (toggle: TVoidFn) => ReactNode;
  modal: (hideModal: TVoidFn) => ReactNode;
  isVisibleOnInit?: boolean;
}
const BaseModalCreator: FC<TBaseModalCreatorProps> = ({
  children,
  modal,
  isVisibleOnInit = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(isVisibleOnInit);
  const toggleModal = () => setIsModalVisible(not);
  const hideModal = () => setIsModalVisible(false);

  return (
    <>
      {isNotNil(children) ? children(toggleModal) : null}

      {isModalVisible ? modal(hideModal) : null}
    </>
  );
};
BaseModalCreator.displayName = "BaseModalCreator";

export { BaseModalCreator };
export type { TWithHideModal };
