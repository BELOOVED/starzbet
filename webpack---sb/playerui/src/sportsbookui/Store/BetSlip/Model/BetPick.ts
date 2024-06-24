import { type IFlatMarket } from "@sb/betting-core/Feed/Types";
import { EBetStrategy } from "../../BetStrategy/Model/EBetStrategy";
import { type TSportId } from "../../MarketFilter/Model/MarketPreset";

const pickKind = {
  base: "base",
  virtualGame: "virtualGame",
} as const;

class PlaceBetPickDto {
  outcomeId;
  coefficient;
  updatedAt;
  banker;

  constructor(outcomeId: string, coefficient: number, updatedAt: string, banker: boolean) {
    this.outcomeId = outcomeId;
    this.coefficient = coefficient;
    this.updatedAt = updatedAt;
    this.banker = banker;
  }
}

abstract class AbstractPick {
  #outcomeId: string;
  #eventId: string;
  #marketId: string;
  #coefficient: number;
  #currentCoefficient: number;
  #outrightId?: string;
  #updatedAt: string;
  #currentUpdatedAt: string;
  #banker: boolean;
  #disable: boolean;

  constructor({
    outcomeId,
    eventId,
    marketId,
    coefficient,
    currentCoefficient,
    updatedAt,
    currentUpdatedAt,
    outrightId,
    banker,
    disable,
  }: {
    outcomeId: string;
    eventId: string;
    marketId: string;
    coefficient: number;
    currentCoefficient?: number;
    updatedAt: string;
    currentUpdatedAt?: string;
    outrightId?: string;
    banker: boolean;
    disable: boolean;
  }) {
    this.#outcomeId = outcomeId;
    this.#eventId = eventId;
    this.#marketId = marketId;
    this.#coefficient = coefficient;
    this.#currentCoefficient = currentCoefficient || coefficient;
    this.#outrightId = outrightId;
    this.#updatedAt = updatedAt;
    this.#currentUpdatedAt = currentUpdatedAt || updatedAt;
    this.#banker = banker;
    this.#disable = disable;
  }

  get outcomeId() {
    return this.#outcomeId;
  }

  set outcomeId(outcomeId) {
    this.#outcomeId = outcomeId;
  }

  get outrightId() {
    return this.#outrightId;
  }

  set outrightId(outrightId) {
    this.#outrightId = outrightId;
  }

  get eventId() {
    return this.#eventId;
  }

  set eventId(eventId) {
    this.#eventId = eventId;
  }

  get marketId() {
    return this.#marketId;
  }

  set marketId(marketId) {
    this.#marketId = marketId;
  }

  get coefficient() {
    return this.#coefficient;
  }

  set coefficient(coefficient) {
    this.#coefficient = coefficient;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set updatedAt(updatedAt) {
    this.#updatedAt = updatedAt;
  }

  get currentCoefficient() {
    return this.#currentCoefficient;
  }

  set currentCoefficient(currentCoefficient) {
    this.#currentCoefficient = currentCoefficient;
  }

  get banker() {
    return this.#banker;
  }

  set banker(banker) {
    this.#banker = banker;
  }

  get currentUpdatedAt() {
    return this.#currentUpdatedAt;
  }

  set currentUpdatedAt(currentUpdatedAt) {
    this.#currentUpdatedAt = currentUpdatedAt;
  }

  get disable() {
    return this.#disable;
  }

  set disable(disable) {
    this.#disable = disable;
  }

  toDto() {
    return new PlaceBetPickDto(this.#outcomeId, this.#currentCoefficient, this.#currentUpdatedAt, this.#banker);
  }

  is(outcomeId: string) {
    return this.#outcomeId === outcomeId;
  }
}

class BasePick extends AbstractPick {
  update(coefficient: number, updatedAt: string, strategy: EBetStrategy) {
    if (strategy === EBetStrategy.any || this.coefficient > this.currentCoefficient) {
      // update currentCoefficient, coefficient and currentUpdatedAt, updatedAt
      return this.copyWith({
        coefficient,
        updatedAt,
      });
    }

    // don't update currentCoefficient and currentUpdatedAt
    return this.copyWith({
      coefficient,
      currentCoefficient: this.currentCoefficient, // explicitly set currentUpdatedAt eq to prev version of BasePick
      updatedAt,
      currentUpdatedAt: this.currentUpdatedAt, // explicitly set currentUpdatedAt eq to prev version of BasePick
    });
  }

  copyWith({
    outcomeId,
    eventId,
    marketId,
    coefficient,
    currentCoefficient,
    updatedAt,
    currentUpdatedAt,
    outrightId,
    banker,
    disable,
  }: Partial<{
    outcomeId: string;
    eventId: string;
    marketId: string;
    coefficient: number;
    currentCoefficient: number;
    updatedAt: string;
    currentUpdatedAt: string;
    outrightId?: string;
    banker: boolean;
    disable: boolean;
  }> = {}) {
    return new BasePick({
      outcomeId: outcomeId === void 0 ? this.outcomeId : outcomeId,
      eventId: eventId === void 0 ? this.eventId : eventId,
      marketId: marketId === void 0 ? this.marketId : marketId,
      coefficient: coefficient === void 0 ? this.coefficient : coefficient,
      currentCoefficient, // when undefined perv version will be used
      updatedAt: updatedAt === void 0 ? this.updatedAt : updatedAt,
      currentUpdatedAt, // when undefined perv version will be used
      outrightId: outrightId === void 0 ? this.outrightId : outrightId,
      banker: banker === void 0 ? this.banker : banker,
      disable: disable === void 0 ? this.disable : disable,
    });
  }
}

class VirtualGamePick extends AbstractPick {
  #market;
  #scope;
  #sportId;
  #event: {
    startTime: number;
  };
  #participants;
  #outcomeParameters;

  constructor({
    outcomeId,
    eventId,
    marketId,
    coefficient,
    updatedAt,
    banker,
    scope,
    sportId,
    market,
    event,
    participants,
    outcomeParameters,
    disable,
  }: {
    outcomeId: string;
    eventId: string;
    marketId: string;
    coefficient: number;
    updatedAt: string;
    banker: boolean;
    disable: boolean;
    // child
    scope: any;
    sportId: TSportId;
    market: IFlatMarket;
    event: any;
    participants: any;
    outcomeParameters: any;
  }) {
    super({
      outcomeId,
      eventId,
      marketId,
      coefficient,
      updatedAt,
      banker,
      disable,
    });

    this.#scope = scope;
    this.#market = market;
    this.#sportId = sportId;
    this.#event = event;
    this.#participants = participants;
    this.#outcomeParameters = outcomeParameters;
  }

  get market() {
    return this.#market;
  }

  set market(market) {
    this.#market = market;
  }

  get scope() {
    return this.#scope;
  }

  set scope(scope) {
    this.#scope = scope;
  }

  get sportId() {
    return this.#sportId;
  }

  set sportId(sportId) {
    this.#sportId = sportId;
  }

  get event() {
    return this.#event;
  }

  set event(event) {
    this.#event = event;
  }

  get participants() {
    return this.#participants;
  }

  set participants(participants) {
    this.#participants = participants;
  }

  get outcomeParameters() {
    return this.#outcomeParameters;
  }

  set outcomeParameters(outcomeParameters) {
    this.#outcomeParameters = outcomeParameters;
  }

  update() {
    return this.copyWith();
  }

  copyWith({
    outcomeId,
    eventId,
    marketId,
    coefficient,
    updatedAt,
    banker,
    scope,
    sportId,
    market,
    event,
    participants,
    outcomeParameters,
    disable,
  }: Partial<{
    outcomeId: string;
    eventId: string;
    marketId: string;
    coefficient: number;
    currentCoefficient: string;
    updatedAt: string;
    currentUpdatedAt: string;
    banker: boolean;
    disable: boolean;
    // child
    scope: any;
    sportId: string;
    market: any;
    event: any;
    participants: any;
    outcomeParameters: any;
  }> = {}) {
    return new VirtualGamePick({
      outcomeId: outcomeId === void 0 ? this.outcomeId : outcomeId,
      eventId: eventId === void 0 ? this.eventId : eventId,
      marketId: marketId === void 0 ? this.marketId : marketId,
      coefficient: coefficient === void 0 ? this.coefficient : coefficient,
      updatedAt: updatedAt === void 0 ? this.updatedAt : updatedAt,
      banker: banker === void 0 ? this.banker : banker,
      scope: scope === void 0 ? this.scope : scope,
      sportId: sportId === void 0 ? this.sportId : sportId,
      market: market === void 0 ? this.market : market,
      event: event === void 0 ? this.event : event,
      participants: participants === void 0 ? this.participants : participants,
      outcomeParameters: outcomeParameters === void 0 ? this.outcomeParameters : outcomeParameters,
      disable: disable === void 0 ? this.disable : disable,
    });
  }
}

type TLocalStoragePick = {
  outcomeId: string;
  eventId?: string;
  outrightId?: string;
}

type TPickKind = typeof pickKind[keyof typeof pickKind]

export type { TLocalStoragePick, TPickKind };

export {
  pickKind,
  BasePick,
  VirtualGamePick,
  AbstractPick,
};
