// @ts-nocheck
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { loggedSelector } from "@sb/auth";
import { useAction } from "@sb/utils";
import { preLiveFavouritesSelector } from "../../Store/PreLive/Selectors/PreLiveSelectors";
import { couponIdListByPlayerIdSelector, startEditPlayerCouponSelector } from "../../Store/Coupon/Selectors/CouponsSelector";
import { couponCancelCreateAction, couponStartCreateAction } from "../../Store/Coupon/CouponActions";

const PlayerFavouritesContainer = memo(({ child }) => {
  const favouriteIdList = useSelector(preLiveFavouritesSelector);

  return createElement(child, { favouriteIdList });
});
PlayerFavouritesContainer.displayName = "PlayerFavouritesContainer";

const PlayerFavouritesAndCouponsContainer = memo(({ child }) => {
  const favouriteIdList = useSelector(preLiveFavouritesSelector);

  const couponIdList = useSelector(couponIdListByPlayerIdSelector);

  const creatingOrEditingCoupon = useSelector(startEditPlayerCouponSelector);

  const startCreateCoupon = useAction(couponStartCreateAction);

  const cancelCreateCoupon = useAction(couponCancelCreateAction);

  return createElement(
    child,
    {
      favouriteIdList,
      couponIdList,
      creatingOrEditingCoupon,
      startCreateCoupon,
      cancelCreateCoupon,
    },
  );
});
PlayerFavouritesAndCouponsContainer.displayName = "PlayerFavouritesAndCouponsContainer";

const PlayerMenuContainer = memo(({ loggedChild, notLoggedChild }) => {
  const logged = useSelector(loggedSelector);

  if (logged) {
    return createElement(PlayerFavouritesAndCouponsContainer, { child: loggedChild });
  }

  return createElement(PlayerFavouritesContainer, { child: notLoggedChild });
});
PlayerMenuContainer.displayName = "PlayerMenuContainer";

export { PlayerMenuContainer };
