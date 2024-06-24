import { getSelectOptions } from "../../../../common/Components/Field/SelectModel";

enum EIndianStateAbbreviation {
  AP = "AP",
  AR = "AR",
  AS = "AS",
  BR = "BR",
  CG = "CG",
  GA = "GA",
  GJ = "GJ",
  HR = "HR",
  HP = "HP",
  JK = "JK",
  JH = "JH",
  KA = "KA",
  KL = "KL",
  MP = "MP",
  MH = "MH",
  MN = "MN",
  ML = "ML",
  MZ = "MZ",
  NL = "NL",
  OR = "OR",
  PB = "PB",
  RJ = "RJ",
  SK = "SK",
  TN = "TN",
  TR = "TR",
  UK = "UK",
  UP = "UP",
  WB = "WB",
  AN = "AN",
  CH = "CH",
  DH = "DH",
  DD = "DD",
  DL = "DL",
  LD = "LD",
  PY = "PY",
}

const INDIAN_STATE_ABBREVIATION_OPTIONS = getSelectOptions(Object.values(EIndianStateAbbreviation));

export { EIndianStateAbbreviation, INDIAN_STATE_ABBREVIATION_OPTIONS };
