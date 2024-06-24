import { isString } from "./IsTypeOf";

const isDev: boolean = process.env["NODE_ENV"] === "development";

const isProd: boolean = process.env["NODE_ENV"] === "production";

/**
 * When run by jest NODE_ENV equals "test" but typescript does not know it
 */
// @ts-ignore
const isTest: boolean = process.env["NODE_ENV"] === "test";

const isE2E_Docker: boolean = process.env["E2E_ENV"] === "docker";

const isE2E_Localhost: boolean = process.env["E2E_ENV"] === "localhost";

const isE2E = process.env["E2E"] === "true";

const isE2E_UpdateScreenshots = process.env["UPDATE_SCREENSHOTS"] === "true";

const isZlotEnv = (envCode: string | null) => isString(envCode) && /^ZLOT/.exec(envCode);
const isBaywinEnv = (envCode: string | null) => isString(envCode) && /^BAYWIN/.exec(envCode);
const isBetpublicEnv = (envCode: string | null) => isString(envCode) && /^BETPUBLIC/.exec(envCode);

export {
  isDev, isProd,
  isTest, isE2E_Docker, isE2E, isE2E_UpdateScreenshots, isE2E_Localhost,
  isZlotEnv,
  isBetpublicEnv,
  isBaywinEnv,
}
