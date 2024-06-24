import {
  platformui_signUp_securityQuestion_whatCityWereYouBornIn,
  platformui_signUp_securityQuestion_whatCityYourParentsMeetIn,
  platformui_signUp_securityQuestion_whatIsTheNameOfYourFirstPet,
  platformui_signUp_securityQuestion_whatIsYourFavoriteFood,
  platformui_signUp_securityQuestion_whatIsYourFavoriteSchoolTeachersName,
  platformui_signUp_securityQuestion_whatIsYourFavouriteMovie,
  platformui_signUp_securityQuestion_whatIsYourMotherMaidenName,
  platformui_signUp_securityQuestion_whatWasTheMakeOfYourFirstCar,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";

type TSecurityQuestions = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string>;
const securityQuestions: TSecurityQuestions = {
  1: platformui_signUp_securityQuestion_whatIsYourFavoriteFood,
  2: platformui_signUp_securityQuestion_whatIsYourFavouriteMovie,
  3: platformui_signUp_securityQuestion_whatCityWereYouBornIn,
  4: platformui_signUp_securityQuestion_whatIsTheNameOfYourFirstPet,
  5: platformui_signUp_securityQuestion_whatIsYourMotherMaidenName,
  6: platformui_signUp_securityQuestion_whatCityYourParentsMeetIn,
  7: platformui_signUp_securityQuestion_whatIsYourFavoriteSchoolTeachersName,
  8: platformui_signUp_securityQuestion_whatWasTheMakeOfYourFirstCar,
} satisfies Record<number, TCommonTKeys>;

export { securityQuestions };
