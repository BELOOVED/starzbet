import { type TPackageName } from "./Generated/TPackageName";

type TLoggerLevel = "info" | "warn" | "error";

type TLoggerZone = "app" |
  "reducer" |
  "storage" |
  "saga" |
  "epic" |
  "rpc" |
  "gql" |
  "react" |
  "translate" |
  "websocket" |
  "selector" |
  "workspace" |
  "form";

type TLoggerArgs = [sense: string, ...args: unknown[]];

type TLogsListener = (namespace: string, level: TLoggerLevel, zones: TLoggerZone[], args: TLoggerArgs) => void;

type TLevelLogger = ((sense: string, ...args: unknown[]) => void) & {
  [Key in TLoggerZone]: TLevelLogger;
};

type TLogger = Record<TLoggerLevel, TLevelLogger>;

type TLoggerFilter = {
  namespace: TPackageName;
  levels: TLoggerLevel[];
};

const LOGS_FILTERS: TLoggerFilter[] = [];

const LOGS_LISTENERS: TLogsListener[] = [];

const createCss = (backgroundColor: string, color: string) =>
  `padding: 2px 4px; text-transform: uppercase; font-size: 10px; background-color: ${backgroundColor}; border: 1px solid ${color}; color: ${color}; margin-right: 4px;`;

const NAME_CSS = createCss("#ffffff", "#3d3f41");

const LEVELS_CSS: Record<TLoggerLevel, string> = {
  info: createCss("#BDE5F8", "#175EA2"),
  warn: createCss("#EFEFB3", "#B6883E"),
  error: createCss("#FFBAB9", "#DA1519"),
};

const ZONE_CSS = createCss("#FFFFFF", "#3D3F41");

const createLevelLogger = (namespace: string, level: TLoggerLevel): TLevelLogger => {
  const zones: TLoggerZone[] = [];

  const logsFilter = LOGS_FILTERS.find((it) => it.namespace === namespace);

  const func = new Proxy(
    (...args: TLoggerArgs) => {
      if (logsFilter?.levels.includes(level)) {
        return;
      }

      /**
       * TODO @lebedev
       * Maybe use not "log" but "level"
       */
      console.log(
        `%c${[namespace, level, ...zones].join("%c")}`,
        NAME_CSS,
        LEVELS_CSS[level],
        ...new Array<string>(zones.length).fill(ZONE_CSS),
        ...args,
      );

      LOGS_LISTENERS.forEach((it) => {
        it(namespace, level, zones, args);
      });
    },
    {
      get(_, p: TLoggerZone): TLevelLogger {
        zones.push(p);

        return func;
      },
    },
  ) as TLevelLogger;

  return func;
};

const createLogger = (namespace: TPackageName): TLogger => ({
  get info() {
    return createLevelLogger(namespace, "info");
  },
  get warn() {
    return createLevelLogger(namespace, "warn");
  },
  get error() {
    return createLevelLogger(namespace, "error");
  },
});

const addLogsListener = (listener: TLogsListener) => {
  LOGS_LISTENERS.push(listener);
};

const applyLogsFilters = (...filters: TLoggerFilter[]) => {
  LOGS_FILTERS.push(...filters);
};

export {
  type TLoggerZone,
  type TLoggerArgs,
  createLogger,
  addLogsListener,
  applyLogsFilters,
};
