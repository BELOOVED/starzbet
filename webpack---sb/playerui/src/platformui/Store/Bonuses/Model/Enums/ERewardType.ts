enum ERewardType {
  cashbackSingle = "cashbackSingle",
  cashbackTiered = "cashbackTiered",
  monetary = "monetary",
  percentage = "percentage",
  freeBetMonetary = "freeBetMonetary",
  freeBetPercentage = "freeBetPercentage",
  freeBetMonetaryOnSport = "freeBetMonetaryOnSport",
  freeBetPercentageOnSport = "freeBetPercentageOnSport",
  freeBetSpinsCount = "freeBetSpinsCount",
  freeSpinsDependsOnDeposit = "freeSpinsDependsOnDeposit",
  freeSpinsCountWithDependsOnDeposit = "freeSpinsCountWithDependsOnDeposit",
}

enum EExternalPlatformRewardType {
  monetary = "monetary",
  percentage = "percentage",
  freeBetMonetary = "freeBetMonetary",
}

export { EExternalPlatformRewardType, ERewardType };
