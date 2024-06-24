import { type TCallResponsePayload } from "@sb/sdk";
import { type call_FixFinGetVevoHavaleBanksQuery, type call_FixFinMakeFiatDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { isAnyObject, isArray, isObject, type TNullable } from "@sb/utils";
import { DepositFormResponseError } from "../Utils/DepositFormResponseError";

type TFixFinFiatResponse = TCallResponsePayload<typeof call_FixFinMakeFiatDepositCommand>
type TFixFinFiatInfoResponse = TFixFinFiatResponse["info"]

type TFixFinFiatWithBankAccounts = Extract<TFixFinFiatInfoResponse, { bankAccounts: unknown; }>
type TFixFinFiatWithBanks = Extract<TFixFinFiatInfoResponse, { banks: unknown; }>
type TFixFinFiatBank = TFixFinFiatWithBanks["banks"][number]

type TFixFinFiatBankAccounts = TFixFinFiatWithBankAccounts["bankAccounts"]
type TFixFinFiatBankAccount = TFixFinFiatBankAccounts[number] & { image?: TNullable<string>; }

interface IWithUrl {
  url: string;
}

const isFixFinFiatWithUrl = (response: TFixFinFiatInfoResponse): response is IWithUrl => "url" in response;

type TFixFinFiatBankAccountsResponse = Omit<TFixFinFiatResponse, "info"> & {
  info: TFixFinFiatWithBankAccounts;
}

type TFixFinFiatBankResponse = Omit<TFixFinFiatResponse, "info"> & {
  info: TFixFinFiatWithBanks;
}

type TFixFinWithBanksResponse<Bank extends TFixFinFiatBank> = Omit<TFixFinFiatResponse, "info"> & {
  info: Omit<TFixFinFiatWithBanks, "banks"> & {
    banks: Bank[];
  };
}

const isFixFinFiatResponse = (response: unknown): response is TFixFinFiatResponse => isObject(response) &&
  "info" in response &&
  "requestId" in response;

const isFixFinFiatWithBankAccounts = (response: TFixFinFiatResponse): response is TFixFinFiatBankAccountsResponse => "bankAccounts" in response.info;

function assertsFixFinFiatWithBankAccountResponse(response: unknown, context: string): asserts response is TFixFinFiatBankAccountsResponse {
  if (!isFixFinFiatResponse(response) || !isFixFinFiatWithBankAccounts(response)) {
    throw new DepositFormResponseError(response, `${context} => assetsFixFinFiatWithBankAccount`);
  }
}

const isFixFinFiatWithBanksResponse = (response: TFixFinFiatResponse): response is TFixFinFiatBankResponse =>
  "banks" in response.info;

function assertsFixFinFiatWithBanksResponse(response: unknown, context: string): asserts response is TFixFinFiatBankResponse {
  if (!isFixFinFiatResponse(response) || !isFixFinFiatWithBanksResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsFixFinFiatWithBanksResponse`);
  }
}

type TFixFiatSistemnakitResult = {
  id: number;
  paparaFullName: string;
  paparaId: string;
  paymentId: number;
}

type TFixFinFiatSistemnakitResponse = Omit<TFixFinFiatResponse, "info"> & {
  info: TFixFiatSistemnakitResult;
}

const isFixFinFiatSistemnakitResponse = (response: TFixFinFiatResponse): response is TFixFinFiatSistemnakitResponse =>
  "paymentId" in response.info &&
  "paparaId" in response.info &&
  "paparaFullName" in response.info;

function assertsFixFinFiatSistemnakitResponse(response: unknown, context: string): asserts response is TFixFinFiatSistemnakitResponse {
  if (!isFixFinFiatResponse(response) || !isFixFinFiatSistemnakitResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsFixFinFiatSistemnakit`);
  }
}

type TVevoHavaleUserResult = {
  accountName: string;
  bankName: string;
  iban: string;
}

type TFixFinFiatVevoHavaleResponse = Omit<TFixFinFiatResponse, "info"> & {
  info: TVevoHavaleUserResult;
}

const isFixFinFiatVevoHavaleResponse = (response: TFixFinFiatResponse): response is TFixFinFiatVevoHavaleResponse =>
  "accountName" in response.info &&
  "bankName" in response.info &&
  "iban" in response.info;

type TFixFinVevoHavaleBank = TCallResponsePayload<typeof call_FixFinGetVevoHavaleBanksQuery>[number];
type TFixFinVevoHavaleResponse = TFixFinFiatVevoHavaleResponse | TFixFinVevoHavaleBank[]

type TFixFinVevoHavaleBanks = {
  bankAccounts: TFixFinVevoHavaleBank[];
}

const isFixFinFiatVevoHavaleBanksResponse = (response: unknown): response is TFixFinVevoHavaleBank[] =>
  isArray(response) &&
  response.every((it) => isAnyObject(it) && "id" in it && "name" in it);

function assertsFixFinVevoHavaleResponse(response: unknown, context: string): asserts response is TFixFinVevoHavaleResponse {
  const isFiatResponse = isFixFinFiatResponse(response) && isFixFinFiatVevoHavaleResponse(response);

  if (!isFiatResponse && !isFixFinFiatVevoHavaleBanksResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsFixFinVevoHavaleResponse`);
  }
}

type TVevoParazulaUserResult = {
  message: string;
  status: boolean;
}

type TFixFinFiatVevoParazulaResponse = Omit<TFixFinFiatResponse, "info"> & {
  info: TVevoParazulaUserResult;
}

const isFixFinFiatVevoParazulaResponse = (response: TFixFinFiatResponse): response is TFixFinFiatVevoParazulaResponse =>
  "message" in response.info &&
  "status" in response.info;

function assertsFixFinFiatVevoParazulaResponse(response: unknown, context: string): asserts response is TFixFinFiatVevoParazulaResponse {
  if (!isFixFinFiatResponse(response) || !isFixFinFiatVevoParazulaResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsFixFinFiatVevoParazulaResponse`);
  }
}

enum EFixFinFiatBank {
  FIX_FIN_FIAT_BANK_FAST = "FIX_FIN_FIAT_BANK_FAST",
  FIX_FIN_FIAT_BANK_AKBANK = "FIX_FIN_FIAT_BANK_AKBANK",
  FIX_FIN_FIAT_BANK_ALBARAKA = "FIX_FIN_FIAT_BANK_ALBARAKA",
  FIX_FIN_FIAT_BANK_ALTERNATIF = "FIX_FIN_FIAT_BANK_ALTERNATIF",
  FIX_FIN_FIAT_BANK_DENIZBANK = "FIX_FIN_FIAT_BANK_DENIZBANK",
  FIX_FIN_FIAT_BANK_FIBABANK = "FIX_FIN_FIAT_BANK_FIBABANK",
  FIX_FIN_FIAT_BANK_ING = "FIX_FIN_FIAT_BANK_ING",
  FIX_FIN_FIAT_BANK_PAPARA = "FIX_FIN_FIAT_BANK_PAPARA",
  FIX_FIN_FIAT_BANK_QNB = "FIX_FIN_FIAT_BANK_QNB",
  FIX_FIN_FIAT_BANK_SEKERBANK = "FIX_FIN_FIAT_BANK_SEKERBANK",
  FIX_FIN_FIAT_BANK_TEB = "FIX_FIN_FIAT_BANK_TEB",
  FIX_FIN_FIAT_BANK_TURKEY = "FIX_FIN_FIAT_BANK_TURKEY",
  FIX_FIN_FIAT_BANK_VAKIFBANK = "FIX_FIN_FIAT_BANK_VAKIFBANK",
  /**
   * withdrawal bank list
   */
  FIX_FIN_FIAT_BANK_YAPIKREDI = "FIX_FIN_FIAT_BANK_YAPIKREDI",
  FIX_FIN_FIAT_BANK_HALBANK = "FIX_FIN_FIAT_BANK_HALBANK",
  FIX_FIN_FIAT_BANK_ZIRAAT = "FIX_FIN_FIAT_BANK_ZIRAAT",
  FIX_FIN_FIAT_BANK_ANADOLUBANK = "FIX_FIN_FIAT_BANK_ANADOLUBANK",
  FIX_FIN_FIAT_BANK_ISBANKASI = "FIX_FIN_FIAT_BANK_ISBANKASI",
  FIX_FIN_FIAT_BANK_GARANTI = "FIX_FIN_FIAT_BANK_GARANTI",
  FIX_FIN_FIAT_BANK_ODEBANK = "FIX_FIN_FIAT_BANK_ODEBANK",
  FIX_FIN_FIAT_BANK_KUVEYT = "FIX_FIN_FIAT_BANK_KUVEYT",

  FIX_FIN_FIAT_BANK_ZIRAAT_KATILIM = "FIX_FIN_FIAT_BANK_ZIRAAT_KATILIM",
  FIX_FIN_FIAT_BANK_VAKIF_KATILIM = "FIX_FIN_FIAT_BANK_VAKIF_KATILIM",
  FIX_FIN_FIAT_BANK_ENPARA = "FIX_FIN_FIAT_BANK_ENPARA",
  FIX_FIN_FIAT_BANK_PTT = "FIX_FIN_FIAT_BANK_PTT",
}

const FIX_FIN_FIAT_BANK_NAME_MAP: Partial<Record<EFixFinFiatBank, string>> = {
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_FAST]: "Fast",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_AKBANK]: "Akbank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ALBARAKA]: "Albaraka Türk Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ALTERNATIF]: "Alternatif Bank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_DENIZBANK]: "DenizBank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_FIBABANK]: "Fibabank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ING]: "ING Bank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_PAPARA]: "Papara",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_QNB]: "QNB Finansbank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_SEKERBANK]: "Şekerbank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TEB]: "TEB",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TURKEY]: "Türkiye Finans Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_VAKIFBANK]: "VakıfBank",

  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_YAPIKREDI]: "Yapıkredi Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_HALBANK]: "Halkbank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ZIRAAT]: "Ziraat Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ANADOLUBANK]: "Anadolubank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ISBANKASI]: "İş Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_GARANTI]: "Garanti Bankası",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ODEBANK]: "Odeabank",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_KUVEYT]: "Kuveyt Türk Bankası",

  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ENPARA]: "Enpara",
};

// From FixFin Ultrapay Bank
const FIX_FIN_FIAT_BANK_ALTERNATIVE_NAME_MAP = {
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ALBARAKA]: "Albaraka Türk",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ING]: "İNG",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ISBANKASI]: "İşbank (Türkiye İş Bankası)",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_KUVEYT]: "Kuveyt Türk",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_YAPIKREDI]: "Yapı Kredi (Yapı ve Kredi Bankası)",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TEB]: "TEB (Türk Ekonomi Bankası)",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_FIBABANK]: "Fibabanka",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_GARANTI]: "Garanti BBVA",

  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ENPARA]: "EFT/FAST Enpara",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_QNB]: "EFT/FAST QNB",
};

// From FixFin VevoPay Bank
const FIX_FIN_FIAT_BANK_ALTERNATIVE_NAME1_MAP = {
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_AKBANK]: "AKBANK",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_GARANTI]: "GARANTİ BANKASI",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_YAPIKREDI]: "YAPI VE KREDİ BANKASI",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TEB]: "TÜRK EKONOMİ BANKASI",
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TURKEY]: "FİNANSBANK",
};

const FIX_FIN_FIAT_BANK_NAME_TO_ID_MAP: Record<string, EFixFinFiatBank> =
  [
    ...Object.entries(FIX_FIN_FIAT_BANK_NAME_MAP),
    ...Object.entries(FIX_FIN_FIAT_BANK_ALTERNATIVE_NAME_MAP),
    ...Object.entries(FIX_FIN_FIAT_BANK_ALTERNATIVE_NAME1_MAP),
  ]
    .reduce(
      (acc, [bankId, bankName]) => ({
        ...acc,
        [bankName]: bankId,
      }),
      {},
    );

export type {
  TFixFinFiatBankAccount,
  TFixFinWithBanksResponse,
  TFixFinFiatBank,
  TVevoHavaleUserResult,
  TFixFinVevoHavaleBanks,
  TFixFinVevoHavaleBank,
};
export {
  isFixFinFiatWithUrl,
  assertsFixFinFiatWithBankAccountResponse,
  assertsFixFinFiatWithBanksResponse,
  assertsFixFinFiatSistemnakitResponse,
  assertsFixFinVevoHavaleResponse,
  isFixFinFiatVevoHavaleBanksResponse,
  assertsFixFinFiatVevoParazulaResponse,
  FIX_FIN_FIAT_BANK_NAME_TO_ID_MAP,
  EFixFinFiatBank,
};
