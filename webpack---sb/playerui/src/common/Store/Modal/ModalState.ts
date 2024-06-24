import { type TExplicitAny } from "@sb/utils";
import { getLocalStorage, localStorageKeys } from "../LocalStorage/localStorageKeys";
import { type EModal } from "./Model/EModal";

interface IWithModalState {
  modal: Partial<Record<EModal, TExplicitAny>>;
  skippedModals: EModal[];
  isFormModalOpen: boolean;
}

const modalState: IWithModalState = {
  modal: {},
  skippedModals: getLocalStorage(localStorageKeys.skippedModals) ?? [],
  isFormModalOpen: false,
};

export type { IWithModalState };
export { modalState };
