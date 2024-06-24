import { defer, EMPTY, from } from "rxjs";
import { catchError } from "rxjs/operators";
import { type ELocale } from "@sb/utils";
import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { call_FindTranslatesByNamespacesBatchCommand } from "@sb/sdk/SDKClient/translator";
import { type ITranslateRequestDto } from "@sb/sdk/shared/translator/api/dto/TranslateRequestDto";
import { Logger } from "../Utils/Logger";
import { type IAllTranslatesProvider } from "./IAllTranslatesProvider";

interface IAllTranslateProviderRequest {
  keys: string[];
  clientNs: string;
}

class AllTranslatesProvider implements IAllTranslatesProvider {
  constructor(private client: IRpcClient, private _requests: IAllTranslateProviderRequest[]) {}

  updateRequests(value: IAllTranslateProviderRequest[]){
    this._requests = [...this._requests, ...value];
  }

  getTranslates(locales: ELocale[]) {
    const requests = this.createTranslateRequestDto(locales);

    return defer(
      () => from(
        call_FindTranslatesByNamespacesBatchCommand(
          this.client,
          { requests },
        ),
      ).pipe(
        catchError((err) => {
          Logger.warn.epic("Fail call_FindTranslatesByNamespacesBatchCommand:", err);

          return EMPTY;
        }),
      ),
    );
  }

  private createTranslateRequestDto(locales: ELocale[]): ITranslateRequestDto[] {
    return this._requests.map((it) => ({ ...it, locales }));
  }
}

export { AllTranslatesProvider, type IAllTranslateProviderRequest };

