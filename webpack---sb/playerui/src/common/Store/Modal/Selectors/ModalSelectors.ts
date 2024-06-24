import { createSimpleSelector, getNotNil, withParams } from "@sb/utils";
import { type IWithEventId } from "../../../IWith";
import { defaultAuthData, EAuthModal, EModal, type IAuthData, type ICouponData, type TGameInfo } from "../Model/EModal";
import { type IWithModalState } from "../ModalState";

/*
* Data is nil if you didn't pass it in useModalOpenAction
* Use notNilModalDataSelector in usual cases
* If you have case with no data - use modalDataSelector with default data
*/

const modalSelector = ({ modal }: IWithModalState) => modal;

const isFormModalOpenSelector = ({ isFormModalOpen }: IWithModalState) => isFormModalOpen;

const modalDataSelector = <T = unknown>({ modal }: IWithModalState, type: EModal) => modal[type] as T | undefined;

const notNilModalDataSelector = <T = unknown>(state: IWithModalState, type: EModal, entity: string) =>
  getNotNil(modalDataSelector<T>(state, type), ["modalSelectors"], entity);

const statisticEventIdSelector = (state: IWithModalState) => notNilModalDataSelector<IWithEventId>(state, EModal.statistics, "statisticIdSelector").eventId;

const gameInfoModalSelector = (state: IWithModalState) => notNilModalDataSelector<TGameInfo>(state, EModal.gameInfo, "gameInfoModalSelector");

const authDataSelector = (state: IWithModalState) => modalDataSelector<IAuthData>(state, EModal.auth) || defaultAuthData;

const couponDataSelector = (state: IWithModalState) => modalDataSelector<ICouponData>(state, EModal.coupon);

const isRegistrationAuthModalOpenedSelector = createSimpleSelector(
  [authDataSelector],
  ({ authType }) => authType === EAuthModal.registration,
);

const cmsPromoModalSelector = (state: IWithModalState) => notNilModalDataSelector<number>(state, EModal.cmsPromo, "cmsPromoModalSelector");

const vipClubLevelUpModalSelector = (state: IWithModalState) => notNilModalDataSelector<number>(state, EModal.vipClubLevelUp, "vipClubLevelUpModalSelector");

const claimBonusFailedModalOpenedSelector = (state: IWithModalState) => !!modalDataSelector<string>(state, EModal.claimBonusFailed);
const claimBonusFailedModalIdSelector = withParams(notNilModalDataSelector<string>, EModal.claimBonusFailed, "claimBonusFailedModalIdSelector");

const activateBonusFailedModalOpenedSelector = (state: IWithModalState) => !!modalDataSelector<string>(state, EModal.activateBonusFailed);
const activateBonusFailedModalIdSelector = withParams(notNilModalDataSelector<string>, EModal.activateBonusFailed, "activateBonusFailedModalIdSelector");

const cancelBonusFailedModalOpenedSelector = (state: IWithModalState) => !!modalDataSelector<string>(state, EModal.cancelBonusFailed);
const cancelBonusFailedModalIdSelector = withParams(notNilModalDataSelector<string>, EModal.cancelBonusFailed, "cancelBonusFailedModalIdSelector");

const bonusNoLongerAvailableModalOpenedSelector = (state: IWithModalState) => !!modalDataSelector(state, EModal.bonusNoLongerAvailable);

export {
  gameInfoModalSelector,
  cmsPromoModalSelector,
  modalSelector,
  statisticEventIdSelector,
  isRegistrationAuthModalOpenedSelector,
  vipClubLevelUpModalSelector,
  authDataSelector,
  couponDataSelector,
  modalDataSelector,
  isFormModalOpenSelector,
  notNilModalDataSelector,
  claimBonusFailedModalIdSelector,
  claimBonusFailedModalOpenedSelector,
  activateBonusFailedModalOpenedSelector,
  activateBonusFailedModalIdSelector,
  cancelBonusFailedModalOpenedSelector,
  cancelBonusFailedModalIdSelector,
  bonusNoLongerAvailableModalOpenedSelector,
};
