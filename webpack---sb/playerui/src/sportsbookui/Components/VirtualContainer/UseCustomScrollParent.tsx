import { createContext, type FC, type PropsWithChildren, useContext } from "react";

const CustomScrollParent = createContext<HTMLElement | undefined>(void 0);

interface ICustomScrollParentProviderProps {
  element: HTMLElement | null | undefined;
}

const CustomScrollParentProvider: FC<PropsWithChildren<ICustomScrollParentProviderProps>> = ({ element, children }) => (
  <CustomScrollParent.Provider value={element ?? undefined}>
    {children}
  </CustomScrollParent.Provider>
);
CustomScrollParentProvider.displayName = "CustomScrollParentProvider";

const useCustomScrollParent = () => useContext(CustomScrollParent);

export { CustomScrollParentProvider, useCustomScrollParent };
