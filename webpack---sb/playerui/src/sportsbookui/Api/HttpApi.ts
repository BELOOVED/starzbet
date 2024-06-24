import { DEVICE_INFO } from "@sb/utils/DeviceInfo";
import { HttpRpcClient, HttpRpcClientWithUrlResolver, type IRpcClient } from "@sb/network-bus/RpcClient";
import { simpleUrlResolver } from "@sb/network-bus/UrlResolver";
import { type TCall, type TCallPayload, type TCallWithPostfix } from "@sb/sdk";
import {
  call_GetActiveBoostsForPlayerQuery,
  call_GetBetHistoryByBetIdQuery,
  call_GetBoostsForGroupQuery,
  call_GetPlayerBetHistoryQuery,
  call_GetPlayerBetsCountQuery,
} from "@sb/sdk/SDKClient/sportsbookread";
import {
  call_EditBetCommand,
  call_GetBetStatesQuery,
  call_PerformCashOutCommand,
  call_PlaceBetBatchCommand,
} from "@sb/sdk/SDKClient/placebet";
import { call_CreateAutoCashOutRuleCommand, call_RemoveAutoCashOutRuleCommand } from "@sb/sdk/SDKClient/autocashout";
import {
  call_CreatePlayerCouponGroupCommand,
  call_FindCouponByIdCommand,
  call_FindCouponGroupsByPlayerGroupIdCommand,
  call_GetPlayerCouponGroupsByPlayerIdCommand,
  call_UpdatePlayerCouponGroupCommand,
} from "@sb/sdk/SDKClient/coupon";
import { call_ExternalPlayerLoginCommand } from "@sb/sdk/SDKClient/platformplayer";
import { call_GetEventSnapshotCommand, call_GetMainLineCommand, call_GetMainLineGapCommand } from "@sb/sdk/SDKClient/frontserver";
import { EHttpMethod, emptySettings, type IMetadata, type ISetting } from "@sb/network-bus/Model";
import { call_getEventStatistics, type IEventKironStatistics } from "@sb/statistics-core";
import { betradarStatisticUrl, clientUrl, ipServiceUrl, kironParserUrl } from "../../common/Urls";
import { type TGlobalErrorHandlerCreator } from "../../common/GlobalErrorHandler/GlobalErrorHandler";
import { Logger } from "../../common/Utils/Logger";
import { RpcClientWithGlobalErrorHandler } from "../../common/GlobalErrorHandler/RpcClientWithGlobalErrorHandler";
import { getProtectionToken } from "../../common/Protection";
import { authTokenService } from "../../common/Store/Auth/AuthTokenService";
import { metadataFactory } from "../../common/Utils/MetadataFactory";
import { anySignal } from "../../common/Utils/AnySignal";

interface IGetKironStatisticsCommand {
  eventIds: string[];
}

interface IVirtualStatistics {
  [index: string]: IEventKironStatistics;
}

const callKironStatistics = (rpcClient: IRpcClient, payload: IGetKironStatisticsCommand) => rpcClient
  .call<IGetKironStatisticsCommand, IVirtualStatistics>(
    payload,
    "sumstats.sportsbook.get_kiron_stat",
  );

let executed = false;

class HttpApi {
  _rpcClient: IRpcClient;

  _betradarStatisticRpcClient: IRpcClient;

  _kironParserRpcClient: IRpcClient;

  constructor(globalErrorHandler: TGlobalErrorHandlerCreator) {
    this._rpcClient = new RpcClientWithGlobalErrorHandler(
      new HttpRpcClient(clientUrl),
      globalErrorHandler,
    );

    this._betradarStatisticRpcClient = new RpcClientWithGlobalErrorHandler(
      new HttpRpcClientWithUrlResolver(simpleUrlResolver(betradarStatisticUrl)),
      globalErrorHandler,
    );

    this._kironParserRpcClient = new RpcClientWithGlobalErrorHandler(
      new HttpRpcClientWithUrlResolver(simpleUrlResolver(kironParserUrl)),
      globalErrorHandler,
    );

    if (executed) {
      Logger.error.app("constructor HttpApi", "already executed");
    }

    executed = true;
  }

  callToIpService = (signal: AbortSignal) => fetch(ipServiceUrl, { method: "GET", signal }).then((response) => {
    if (response.ok) {
      return response.text();
    }

    throw new Error("Request ip service failed.");
  });

  callSportsbookLogin = (
    externalPlayerAccessToken: string,
    signal: AbortSignal,
  ) => this.callToIpService(signal).then((ipToken) => this._callSbApi(
    call_ExternalPlayerLoginCommand,
    {
      externalPlayerAccessToken,
      deviceInfo: DEVICE_INFO,
    },
    { ipToken },
    { signal },
  ));

  callPlaceBatch = (payload, signal: AbortSignal) => this.callToIpService(signal)
    .then(
      (ipToken) => this._callSbApi(
        call_PlaceBetBatchCommand,
        payload,
        { ipToken },
        { signal },
      ),
    );

  callBetById = (
    betUuid: string,
    signal: AbortSignal,
  ) => this._callSbApi(call_GetBetHistoryByBetIdQuery, { betUuid }, undefined, { signal });

  callPlayerBetHistory = (payload: TCallPayload<typeof call_GetPlayerBetHistoryQuery>, signal: AbortSignal) =>
    this._callSbApi(call_GetPlayerBetHistoryQuery, payload, undefined, { signal });

  callGetStatistics = (
    eventId: string,
    signal: AbortSignal,
  ) => this._callBetradarStatisticApi(call_getEventStatistics, eventId, undefined, { signal });

  callGetVirtualRacingStatistics = (
    payload: IGetKironStatisticsCommand,
    signal: AbortSignal,
  ) => this._callKironParserApi(callKironStatistics, payload, undefined, { signal });

  callCountPlayerBets = (
    playerId: string,
    signal: AbortSignal,
  ) => this._callSbApi(call_GetPlayerBetsCountQuery, { playerId }, undefined, { signal });

  callBetStates = (betId: string, signal: AbortSignal) => this._callSbApi(call_GetBetStatesQuery, { betId }, undefined, { signal });

  callEditBet = (
    payload,
    signal: AbortSignal,
  ) => this.callToIpService(signal).then((ipToken) => this._callSbApi(call_EditBetCommand, payload, { ipToken }, { signal }));

  callCreatePlayerCoupon = (
    payload,
    signal: AbortSignal,
  ) => this._callSbApi(call_CreatePlayerCouponGroupCommand, payload, undefined, { signal });

  callUpdatePlayerCoupon = (
    payload,
    signal: AbortSignal,
  ) => this._callSbApi(call_UpdatePlayerCouponGroupCommand, payload, undefined, { signal });

  callPerformPartialCashOut = (payload: TCallPayload<typeof call_PerformCashOutCommand>, signal: AbortSignal) =>
    this.callToIpService(signal).then((ipToken) => this._callSbApi(call_PerformCashOutCommand, payload, { ipToken }, { signal }));

  callCreateAutoCashOutRule = (payload: TCallPayload<typeof call_CreateAutoCashOutRuleCommand>, signal: AbortSignal) =>
    this._callSbApi(call_CreateAutoCashOutRuleCommand, payload, undefined, { signal });

  callRemoveAutoCashOutRule = (
    autoCashOutRuleId: string,
    signal: AbortSignal,
  ) => this._callSbApi(call_RemoveAutoCashOutRuleCommand, { autoCashOutRuleId }, undefined, { signal });

  callFindCouponById = (
    couponId: string,
    signal: AbortSignal,
  ) => this._callSbApi(call_FindCouponByIdCommand, { couponId }, undefined, { signal });

  callFindCouponGroupsByPlayerGroupId = (playerGroupId: string, signal: AbortSignal) => this._callSbApi(
    call_FindCouponGroupsByPlayerGroupIdCommand,
    { playerGroupId },
    undefined,
    { signal },
  );

  callGetPlayerCouponGroupsByPlayerId = (playerId: string, signal: AbortSignal) => this._callSbApi(
    call_GetPlayerCouponGroupsByPlayerIdCommand,
    { playerId },
    undefined,
    { signal },
  );

  callGetBoostsForGroup = (groupId: string, signal: AbortSignal) => this._callSbApi(
    call_GetBoostsForGroupQuery,
    { groupId },
    undefined,
    { signal },
  );

  callGetActiveBoostsForPlayer = (playerId: string, signal: AbortSignal) => this._callSbApi(
    call_GetActiveBoostsForPlayerQuery,
    { playerId },
    undefined,
    { signal },
  );

  callGetMainLine = (postfix: string, signal: AbortSignal) => this._callSbApiWithPostfix(
    call_GetMainLineCommand,
    postfix,
    undefined,
    { signal, httpMethod: EHttpMethod.GET },
  );

  callGetEventSnapshot = (payload: {postfix: string; eventId: string;}, signal: AbortSignal) => this._callSbApiWithPostfix(
    call_GetEventSnapshotCommand,
    payload.postfix,
    { eventId: payload.eventId },
    { signal },
  );

  callGetMainLineGap = (payload: { postfix: string; version: number; }, signal: AbortSignal) => this._callSbApiWithPostfix(
    call_GetMainLineGapCommand,
    payload.postfix,
    { version: payload.version },
    { signal },
  );

  _callApi = (rpcClient: IRpcClient) => <P, R>(
    call: TCall<P, R>,
    payload: P = {} as P,
    metadata?: IMetadata,
    settings?: Partial<ISetting>,
  ) => {
    const start = Date.now();

    const signals = [settings?.signal, authTokenService.createSignal()].filter(Boolean);

    return Promise.all(
      [
        authTokenService.getTokenOrNil(),
        getProtectionToken(),
      ],
    )
      .then(([token, secret]) => (
        call(
          rpcClient,
          payload,
          { ...metadata, ...metadataFactory(token, secret) },
          { ...emptySettings, signal: anySignal(signals) },
        )
      ))
      .then((response) => {
        Logger.info.rpc(`[HttpApi] call "${call.name}". duration: ${Date.now() - start}ms`);

        return response;
      });
  };

  _callSbApi = <P, R>(call: TCall<P, R>, payload: P = {} as P, metadata?: IMetadata, settings?: Partial<ISetting>) => (
    this._callApi(this._rpcClient)(call, payload, metadata, settings)
  );

  _callBetradarStatisticApi = <P, R>(call: TCall<P, R>, payload: P = {} as P, metadata?: IMetadata, settings?: Partial<ISetting>) => (
    this._callApi(this._betradarStatisticRpcClient)(call, payload, metadata, settings)
  );

  _callKironParserApi = <P, R>(call: TCall<P, R>, payload: P = {} as P, metadata?: IMetadata, settings?: Partial<ISetting>) => (
    this._callApi(this._kironParserRpcClient)(call, payload, metadata, settings)
  );

  _callSbApiWithPostfix = <P, R>(
    call: TCallWithPostfix<P, R>,
    postfix: string,
    payload: P = {} as P,
    settings: Partial<ISetting>,
  ) => {
    const start = Date.now();

    const signals = [settings.signal, authTokenService.createSignal()].filter(Boolean);

    return Promise.all(
      [
        authTokenService.getTokenOrNil(),
        getProtectionToken(),
      ],
    )
      .then(([token, secret]) => call(
        this._rpcClient,
        postfix,
        payload,
        metadataFactory(token, secret),
        { ...emptySettings, ...settings, signal: anySignal(signals)  },
      ))
      .then((response) => {
        Logger.info.rpc(`[HttpApi] call "${call.name}". duration: ${Date.now() - start}ms`);

        return response;
      });
  };
}

export { HttpApi };
