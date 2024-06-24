import { DEVICE_INFO } from "@sb/utils/DeviceInfo";
import { HttpRpcClient, HttpRpcClientWithUrlResolver, type IRpcClient } from "@sb/network-bus/RpcClient";
import { simpleUrlResolver } from "@sb/network-bus/UrlResolver";
import { type TCall, type TCallPayload } from "@sb/sdk";
import {
  call_DeletePlayerDeviceCommand,
  call_GetLoginResponseByOneTimeTokenCommand,
  call_LoginPlayerCommand,
  call_PlayerEmailExistsQuery,
  call_PlayerLoginExistsQuery,
  call_PlayerPhoneExistsQuery,
  call_PlayerUpdateDeviceVerificationCodeCommand,
  call_PlayerVerifyDeviceCommand,
  call_RefreshKeepAliveCommand,
  call_RefreshTokenCommand,
  call_RegisterPlayerCommand,
  call_RegisterPrivatePlayerCommand,
  call_RequestPlayerEmailUpdateCommand,
  call_RequestPlayerPhoneUpdateCommand,
  call_RevokeTokenCommand,
  call_UpdatePasswordByEmailCommand,
  call_ValidateIdentityNumberCommand,
  call_VerifyEmailCommand,
} from "@sb/sdk/SDKClient/platformplayer";
import { call_CancelCallRequestCommand } from "@sb/sdk/SDKClient/callrequest";
import { call_UploadKycDocumentCommand } from "@sb/sdk/SDKClient/kyc";
import { call_AddTicketMessageCommand, call_OpenTicketCommand, call_ReadTicketCommand } from "@sb/sdk/SDKClient/ticket";
import {
  call_ActivatePlayerBonusByPlayerCommand,
  call_CancelPlayerBonusByPlayerCommand,
  call_ClaimBonusByPlayerCommand,
  call_ClaimBonusByPromotionCodeCommand,
  call_GetBonusesForPromotionsQuery,
  call_GetCashbackSumByPlayerCommand,
  call_GetNotSettledResourceCountQuery,
} from "@sb/sdk/SDKClient/bonus";
import { call_GetDemoGameLinkCommand, call_GetGameLinkCommand } from "@sb/sdk/SDKClient/gamemanager";
import { emptySettings, type ISetting } from "@sb/network-bus/Model";
import { loadCaptchaMetadata } from "@sb/captcha";
import { type IUploadKycDocumentCommand } from "@sb/sdk/platform/player/api/command/kyc/UploadKycDocumentCommand";
import { call_GetSnapshotQuery } from "@sb/sdk/SDKClient/pragmaticplaydga";
import { call_GetNotSeenCountForUserQuery, call_MarkAsSeenCommand } from "@sb/sdk/SDKClient/usermessages";
import { call_VipClubCashbackPointsCommand } from "@sb/sdk/SDKClient/vipclub";
import { call_GetBetfairLinkCommand, call_GetLiveSpinsStreamSettingsCommand } from "@sb/sdk/SDKClient/gameintegration";
import { call_GetCurrentDomainQuery } from "@sb/sdk/SDKClient/domains";
import { clientUrl, ipServiceUrl, pragmaticDgaUrl } from "../../common/Urls";
import { type TGlobalErrorHandlerCreator } from "../../common/GlobalErrorHandler/GlobalErrorHandler";
import { RpcClientWithGlobalErrorHandler } from "../../common/GlobalErrorHandler/RpcClientWithGlobalErrorHandler";
import { getProtectionToken } from "../../common/Protection";
import { authTokenService } from "../../common/Store/Auth/AuthTokenService";
import { metadataFactory } from "../../common/Utils/MetadataFactory";
import { anySignal } from "../../common/Utils/AnySignal";
import { captchaVisible } from "../../common/Constants/CaptchaVisible";

class PlatformHttpApi {
  _rpcClient: IRpcClient;

  _pragmaticDgaRpcClient: IRpcClient;

  constructor(globalErrorHandler: TGlobalErrorHandlerCreator) {
    this._rpcClient = new RpcClientWithGlobalErrorHandler(
      new HttpRpcClient(clientUrl),
      globalErrorHandler,
    );

    this._pragmaticDgaRpcClient = new RpcClientWithGlobalErrorHandler(
      new HttpRpcClientWithUrlResolver(simpleUrlResolver(pragmaticDgaUrl)),
      globalErrorHandler,
    );
  }

  //DGA
  callPragmaticDgaGetSnapshot = () =>
    call_GetSnapshotQuery(this._pragmaticDgaRpcClient, {});

  callToIpService = (signal: AbortSignal) => fetch(ipServiceUrl, { method: "GET", signal }).then((response) => {
    if (response.ok) {
      return response.text();
    }

    throw new Error("Request ip service failed.");
  });

  callPlatformLogin = (token, signal: AbortSignal) => Promise.all([
    this.callToIpService(signal),
    loadCaptchaMetadata(),
  ]).then(
    ([ipToken, captchaMeta]) => this._callToPlatform(
      call_LoginPlayerCommand,
      { ...token, deviceInfo: DEVICE_INFO },
      { ipToken, ...captchaMeta },
      { signal },
      false,
    ),
  );

  callPlatformUpdatePasswordByEmail = (payload: TCallPayload<typeof call_UpdatePasswordByEmailCommand>, signal: AbortSignal) => (
    this._callToPlatform(call_UpdatePasswordByEmailCommand, payload, undefined, { signal })
  );

  callPlatformRegister = (payload: TCallPayload<typeof call_RegisterPlayerCommand>, signal: AbortSignal) => Promise.all([
    this.callToIpService(signal),
    loadCaptchaMetadata(captchaVisible),
  ]).then(
    ([ipToken, captchaMetadata]) => this._callToPlatform(
      call_RegisterPlayerCommand,
      { ...payload, deviceInfo: DEVICE_INFO },
      { ipToken, ...captchaMetadata },
      { signal },
    ),
  );

  callPlatformPrivateRegister = (payload: Omit<TCallPayload<typeof call_RegisterPrivatePlayerCommand>, "deviceInfo">, signal: AbortSignal) => Promise.all([
    this.callToIpService(signal),
    loadCaptchaMetadata(captchaVisible),
  ])
    .then(
      ([ipToken, captchaMetadata]) => this._callToPlatform(
        call_RegisterPrivatePlayerCommand,
        { ...payload, deviceInfo: DEVICE_INFO },
        { ipToken, ...captchaMetadata },
        { signal },
      ),
    );

  callVerifyEmail = (
    payload: TCallPayload<typeof call_VerifyEmailCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_VerifyEmailCommand, payload, undefined, { signal });

  callKeepAliveRefresh = (
    payload: TCallPayload<typeof call_RefreshKeepAliveCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_RefreshKeepAliveCommand, payload, undefined, { signal });

  callRefreshToken = (refreshToken: string, signal: AbortSignal) => this.callToIpService(signal)
    .then(
      (ipToken) => this._callToPlatform(
        call_RefreshTokenCommand,
        { refreshToken },
        { ipToken },
        { signal },
        false,
      ),
    );

  callRevokeToken = (
    payload: TCallPayload<typeof call_RevokeTokenCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_RevokeTokenCommand, payload, undefined, { signal });

  callLoginResponseByOneTimeToken = (
    payload: TCallPayload<typeof call_GetLoginResponseByOneTimeTokenCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_GetLoginResponseByOneTimeTokenCommand, payload, undefined, { signal });

  callUploadKycDocument = (
    payload: IUploadKycDocumentCommand,
    signal: AbortSignal,
  ) => this._callToPlatform(call_UploadKycDocumentCommand, payload, undefined, { signal });

  callOpenTicket = (
    payload: TCallPayload<typeof call_OpenTicketCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_OpenTicketCommand, payload, undefined, { signal });

  callAddMessageToTicket = (payload: TCallPayload<typeof call_AddTicketMessageCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_AddTicketMessageCommand, payload, undefined, { signal });

  callReadTicket = (
    payload: TCallPayload<typeof call_ReadTicketCommand>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_ReadTicketCommand, payload, undefined, { signal });

  callActivateBonus = (
    playerBonusId: string,
    signal: AbortSignal,
  ) => this._callToPlatform(call_ActivatePlayerBonusByPlayerCommand, { playerBonusId }, undefined, { signal });

  callCancelBonus = (
    playerBonusId: string,
    signal: AbortSignal,
  ) => this._callToPlatform(call_CancelPlayerBonusByPlayerCommand, { playerBonusId }, undefined, { signal });

  callClaimBonus = (
    bonusId: string,
    signal: AbortSignal,
  ) => this._callToPlatform(call_ClaimBonusByPlayerCommand, { bonusId }, undefined, { signal });

  callClaimBonusByPromotionCode = (
    promotionCode: string,
    signal: AbortSignal,
  ) => this._callToPlatform(call_ClaimBonusByPromotionCodeCommand, { promotionCode }, undefined, { signal });

  callGetNotSettledResourceCountQuery = (
    playerBonusId: string,
    signal: AbortSignal,
  ) => this._callToPlatform(call_GetNotSettledResourceCountQuery, { playerBonusId }, undefined, { signal });

  callGetCashbackSum = (payload: TCallPayload<typeof call_GetCashbackSumByPlayerCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_GetCashbackSumByPlayerCommand, payload, undefined, { signal });

  callGetGameLink = (payload: TCallPayload<typeof call_GetGameLinkCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_GetGameLinkCommand, payload, undefined, { signal });

  callGetLiveSpinsStreamSettings = (payload: TCallPayload<typeof call_GetLiveSpinsStreamSettingsCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_GetLiveSpinsStreamSettingsCommand, payload, undefined, { signal });

  callGetDemoGameLink = (payload: TCallPayload<typeof call_GetDemoGameLinkCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_GetDemoGameLinkCommand, payload, undefined, { signal });

  callCancelCallRequest = (payload: TCallPayload<typeof call_CancelCallRequestCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_CancelCallRequestCommand, payload, undefined, { signal });

  callPlayerCPFCheck = (payload: TCallPayload<typeof call_ValidateIdentityNumberCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_ValidateIdentityNumberCommand, payload, undefined, { signal });

  callPlayerEmailExists = async (payload: TCallPayload<typeof call_PlayerEmailExistsQuery>) =>
    this._callToPlatform(call_PlayerEmailExistsQuery, payload);

  callPlayerPhoneExists = (payload: TCallPayload<typeof call_PlayerPhoneExistsQuery>) =>
    this._callToPlatform(call_PlayerPhoneExistsQuery, payload);

  callPlayerLoginExists = (payload: TCallPayload<typeof call_PlayerLoginExistsQuery>) =>
    this._callToPlatform(call_PlayerLoginExistsQuery, payload);

  callGetBonusesForPromo = (
    payload: TCallPayload<typeof call_GetBonusesForPromotionsQuery>,
    signal: AbortSignal,
  ) => this._callToPlatform(call_GetBonusesForPromotionsQuery, payload, undefined, { signal });

  callUserMessageUnseenCount = (payload: TCallPayload<typeof call_GetNotSeenCountForUserQuery>, signal: AbortSignal) =>
    this._callToPlatform(call_GetNotSeenCountForUserQuery, payload, undefined, { signal });

  callUserMessageMarkAsSeen = (payload: TCallPayload<typeof call_MarkAsSeenCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_MarkAsSeenCommand, payload, undefined, { signal });

  callCashbackPoints = (payload: TCallPayload<typeof call_VipClubCashbackPointsCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_VipClubCashbackPointsCommand, payload, undefined, { signal });

  callPlayerVerifyDevice = (payload: TCallPayload<typeof call_PlayerVerifyDeviceCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_PlayerVerifyDeviceCommand, payload, undefined, { signal });

  callResendVerifyCodeDevice = (payload: TCallPayload<typeof call_PlayerUpdateDeviceVerificationCodeCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_PlayerUpdateDeviceVerificationCodeCommand, payload, undefined, { signal });

  callRemoveDevice = (payload: TCallPayload<typeof call_DeletePlayerDeviceCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_DeletePlayerDeviceCommand, payload, undefined, { signal });

  callGetBetFairLink = (payload: TCallPayload<typeof call_GetBetfairLinkCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_GetBetfairLinkCommand, payload, undefined, { signal });

  callGetCurrentDomain = (payload: TCallPayload<typeof call_GetCurrentDomainQuery>, signal: AbortSignal) =>
    this._callToPlatform(call_GetCurrentDomainQuery, payload, undefined, { signal });

  _callToPlatform = <P, R>(
    call: TCall<P, R>,
    payload: P,
    metadata = {},
    settings?: Partial<ISetting>,
    // eslint-disable-next-line rulesdir/no-truethly-default-assign
    waitToken = true,
  ): Promise<R> => {
    const signals = [settings?.signal, authTokenService.createSignal()].filter(Boolean);

    return (
      Promise.all(
        [
          authTokenService.getTokenOrNil(!waitToken),
          getProtectionToken(),
        ],
      ).then(([token, secret]) => call(
        this._rpcClient,
        payload,
        {
          ...metadata,
          ...metadataFactory(token, secret),
        },
        {
          ...emptySettings,
          ...settings,
          signal: anySignal(signals),
        },
      ))
    );
  };

  callRequestPlayerEmailUpdateCommand = (payload: TCallPayload<typeof call_RequestPlayerEmailUpdateCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_RequestPlayerEmailUpdateCommand, payload, undefined, { signal });

  callRequestPlayerPhoneNumberUpdateCommand = (payload: TCallPayload<typeof call_RequestPlayerPhoneUpdateCommand>, signal: AbortSignal) =>
    this._callToPlatform(call_RequestPlayerPhoneUpdateCommand, payload, undefined, { signal });
}

export { PlatformHttpApi };
