import { type ReactNode } from "react";
import { type ECurrencyCode, EMoneyFormat, type IMoney, type IMoneyBag, isNil, Money, type TNil, type TNullable } from "@sb/utils";
import { SMALL_DASH_FALLBACK } from "../../common/Components/Fallback/Fallback";

function findPlayerMoneyInBag(moneyBag: TNil, playerCurrency: ECurrencyCode): null;
function findPlayerMoneyInBag(moneyBag: IMoneyBag, playerCurrency: ECurrencyCode): IMoney;
function findPlayerMoneyInBag(moneyBag: TNullable<IMoneyBag>, playerCurrency: ECurrencyCode): IMoney | null;

/**
 * find in bag Money with player currency (fallback -> system)
 */
function findPlayerMoneyInBag(moneyBag: TNullable<IMoneyBag>, playerCurrency: ECurrencyCode) {
  if (isNil(moneyBag)) {
    return null;
  }

  const { system, additional } = moneyBag;

  const playerMoney = [...additional, system].find(({ currency }) => currency === playerCurrency);

  return playerMoney || system;
}

function toFormatPlayerMoneyInBag(moneyBag: TNil, playerCurrency: ECurrencyCode): typeof SMALL_DASH_FALLBACK;
function toFormatPlayerMoneyInBag(moneyBag: IMoneyBag, playerCurrency: ECurrencyCode): string;
function toFormatPlayerMoneyInBag(moneyBag: TNullable<IMoneyBag>, playerCurrency: ECurrencyCode): string;

function toFormatPlayerMoneyInBag(
  moneyBag: TNullable<IMoneyBag>,
  playerCurrency: ECurrencyCode,
  format = EMoneyFormat.symbolRight,
  fallback: ReactNode = SMALL_DASH_FALLBACK,
) {
  const money = findPlayerMoneyInBag(moneyBag, playerCurrency);

  if (isNil(money)) {
    return fallback;
  }

  return Money.toFormat(money, format);
}

export { findPlayerMoneyInBag, toFormatPlayerMoneyInBag };
