import { isNil, isNotNil } from "./IsNil";

const matchFactory = (regExp: RegExp) => (candidate: string) => isNotNil(regExp.exec(candidate))

// check that all string match with regExp
const strictMatchFactory = (regExp: RegExp) => (candidate: string) => {
  const match = regExp.exec(candidate)

  if (isNil(match)) {
    return false
  }

  return match[0] === candidate
}

const uuidRegExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const isUuid = matchFactory(uuidRegExp);

const phoneNumberRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const isPhoneNumber = matchFactory(phoneNumberRegExp);

const emailRegExp = /^(?<name>[a-zA-Z0-9+._%-]{1,64})@((?<subdomain>[a-zA-Z0-9][a-zA-Z0-9-]{0,64})\.)?(?<domain>[a-zA-Z0-9][a-zA-Z0-9-]{0,256}\.[a-zA-Z0-9]{1,6})$/;
const isEmail = matchFactory(emailRegExp);

const IPv4RegExp = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const isIPv4 = matchFactory(IPv4RegExp);

const IPv6RegExp = /(([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,7}:|([\da-fA-F]{1,4}:){1,6}:[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,5}(:[\da-fA-F]{1,4}){1,2}|([\da-fA-F]{1,4}:){1,4}(:[\da-fA-F]{1,4}){1,3}|([\da-fA-F]{1,4}:){1,3}(:[\da-fA-F]{1,4}){1,4}|([\da-fA-F]{1,4}:){1,2}(:[\da-fA-F]{1,4}){1,5}|[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,6})|:((:[\da-fA-F]{1,4}){1,7}|:)|fe80:(:[\da-fA-F]{0,4}){0,4}%[\da-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d)|([\da-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d))/;
const isIPv6 = matchFactory(IPv6RegExp);

const hexColorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const isHexColor = matchFactory(hexColorRegExp)

const rgbOrRgbaColorRegExp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
const isRgbOrRgbaColor = matchFactory(rgbOrRgbaColorRegExp)

/* this regExp don't support all cases. Support:
      support hex and rgb(a) color
      radial-gradient(71.9% 71.9% at 51.25% 16.88%, #7C007F 0%, rgba(0, 0, 0, 0.5) 100%)
      linear-gradient(180deg,  rgb(0, 0, 0, 0.5) 0%, #6D9DD8 100%), rgba(0, 0, 0, 0.5)
      linear-gradient(180deg, #2D333B 0%, #6D9DD8 100%), radial-gradient(71.9% 71.9% at 51.25% 16.88%, #7C007F 0%, rgba(0, 0, 0, 0.5) 100%), #000000
 */
const gradientColorRegExp = /((\s?(radial|linear)-gradient\(((([0-9]{1,3})(\.[0-9]{1,2})?% ([0-9]{1,3})(\.[0-9]{1,2})?% at ([0-9]{1,3})(\.[0-9]{1,2})?% ([0-9]{1,3})(\.[0-9]{1,2})?%)|([0-9]{1,3}deg)), ((#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))|(rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\))) [0-9]{1,3}%, ((#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))|(rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\))) [0-9]{1,3}%\),?)+)( ((#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))|(rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\))))?/
const isGradientColorRegExp = strictMatchFactory(gradientColorRegExp)

const ipRegExp = /(^(?:\d{1,3}\.){3}\d{1,3}$)|(([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,7}:|([\da-fA-F]{1,4}:){1,6}:[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){1,5}(:[\da-fA-F]{1,4}){1,2}|([\da-fA-F]{1,4}:){1,4}(:[\da-fA-F]{1,4}){1,3}|([\da-fA-F]{1,4}:){1,3}(:[\da-fA-F]{1,4}){1,4}|([\da-fA-F]{1,4}:){1,2}(:[\da-fA-F]{1,4}){1,5}|[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,6})|:((:[\da-fA-F]{1,4}){1,7}|:)|fe80:(:[\da-fA-F]{0,4}){0,4}%[\da-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d)|([\da-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d))/;
const isIP = (candidate: string) => isIPv4(candidate) || isIPv6(candidate);

const alphabetRegExp = /^[^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0123456789]*$/;
const isAlphabet = matchFactory(alphabetRegExp);

const urlRegExp = /^https?:\/\/(?<hostname>(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)(?<path>[-a-zA-Z0-9()@:%_+.~#?&//=]*)\/?$/;
const isUrl = matchFactory(urlRegExp);

export {
  uuidRegExp,
  isUuid,
  phoneNumberRegExp,
  isPhoneNumber,
  emailRegExp,
  isEmail,
  IPv4RegExp,
  isIPv4,
  IPv6RegExp,
  isIPv6,
  isHexColor,
  isRgbOrRgbaColor,
  ipRegExp,
  isIP,
  isGradientColorRegExp,
  isAlphabet,
  urlRegExp,
  isUrl,
};

