import { isProd } from "@sb/utils";

//todo check this pls

const SERVER_ENVIRONMENT_CODE = process.env.SERVER_ENVIRONMENT_CODE;

const isDevServEnvCode = SERVER_ENVIRONMENT_CODE && !!SERVER_ENVIRONMENT_CODE.match(/^STG_|^DEMO_|^DEV_|STG__PL_SB$/);

const isProdServerEnv = isProd && !isDevServEnvCode;

const IS_STARZBET_KG = !!SERVER_ENVIRONMENT_CODE && !!SERVER_ENVIRONMENT_CODE.match(/^STARZBET_KG/);

const IS_STARZBET_IN = !!SERVER_ENVIRONMENT_CODE && !!SERVER_ENVIRONMENT_CODE.match(/^STARZBET_IN/);

export {
  isProdServerEnv,
  IS_STARZBET_KG,
  IS_STARZBET_IN,
};

