/**
 * Logger extension allowing to send logs to sentry
 *
 * INFO and WARN logs will not be sent
 * 100% of ERROR logs will be sent (except those filtered by the "ignoreErrors" property in the options if specified)
 */
import {
  BrowserClient,
  browserTracingIntegration,
  defaultStackParser,
  httpContextIntegration,
  makeFetchTransport,
  Scope,
  setCurrentClient,
} from "@sentry/browser";
import { type CaptureContext, type Event, type EventHint } from "@sentry/types";
import { addLogsListener, type TLoggerArgs } from "./Logger";

type TOptions = {
  dsn: string;
  release: string;
  environment: string;
  /**
   * Allows not to send a log if a message (or an error message) matches a RegExp
   */
  ignoreErrors?: RegExp[];
  /**
   * Useful for embedded applications if they are not embedded in our product
   */
  ignoreUnhandledErrors?: boolean;
  /**
   * Used for pushing web vitals metrics to sentry. Just set it to true to enable
   */
  shouldCollectWebVitals?: boolean;

  tracesSampleRate?: number;

  sampleRate?: number;
};

let ENABLED = false;

const composeDetailedMessage = (args: unknown[]) => {
  let message = "";

  if (args.length === 0) {
    return message;
  }

  args.forEach((it, i) => {
    message += "\n\n";

    if (Object(it) === it) {
      message += JSON.stringify(it, null, 1);
    } else {
      message += String(it);
    }

    if (i === args.length - 1) {
      message += "\n";
    }
  });

  return message;
};

const send = (
  sentryClient: BrowserClient,
  options: TOptions,
  namespace: null | string,
  zones: string[],
  args: TLoggerArgs,
) => {
  const errorIndex = args.findIndex((it) => it instanceof Error);

  const error = (args[errorIndex] ?? null) as Error | null;

  if (errorIndex !== -1) {
    args.splice(errorIndex, 1);
  }

  let sense = args[0];

  /**
   * Additional check for "string" just in case of incorrect arguments despite types
   */
  if (typeof sense !== "string") {
    sense = "UNKNOWN";
  } else {
    args.shift();
  }

  if (error) {
    sense += ` ${error.message}`;
  }

  const message = composeDetailedMessage(args);

  if (options.ignoreErrors) {
    for (const regExp of options.ignoreErrors) {
      if (regExp.test(sense) || regExp.test(message)) {
        return;
      }
    }
  }

  if (error) {
    error.name = `[${options.release}] ${error.name} ${sense}`;

    const scope = new Scope();

    scope.setExtras({
      namespace,
      zones: zones.join(" | "),
      message,
      error,
    });

    sentryClient.captureException(error, { captureContext: { level: "error" } }, scope);

    return;
  }

  const event: Event = {
    event_id: `${Date.now()}${Math.random()}${performance.now()}`.replace(/./g, ""),
    level: "error",
    release: options.release,
    environment: options.environment,
    message: `[${options.release}] ${sense}`,
  };

  const captureContext: CaptureContext = {
    level: "error",
    extra: {
      namespace,
      zones: zones.join(" | "),
      message,
    },
  };

  const hint: EventHint = { captureContext };

  sentryClient.captureEvent(event, hint);
};

const enableSentryBrowser = (options: TOptions) => {
  if (ENABLED) {
    console.error("Sentry already enabled");

    return;
  }

  const sentryClient = new BrowserClient({
    dsn: options.dsn,
    release: options.release,
    environment: options.environment,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: [
      httpContextIntegration(),
      options.shouldCollectWebVitals && browserTracingIntegration(),
    ].filter(Boolean),
    /**
     * Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
     * Recommend adjusting this value in production
     */
    tracesSampleRate: options.tracesSampleRate || 1,
    sampleRate: options.sampleRate || 1,
  });

  /** required for embedded applications with own sentry client, like widgets */
  setCurrentClient(sentryClient);

  sentryClient.init();

  if (!options.ignoreUnhandledErrors) {
    window.addEventListener(
      "error",
      (event) => {
        send(sentryClient, options, null, ["unhandled"], ["Uncaught", event.message, event.error]);
      },
    );
  }

  addLogsListener(
    (namespace, level, zones, args) => {
      if (level === "error") {
        send(sentryClient, options, namespace, zones, args);
      }
    },
  );

  ENABLED = true;
};

export { enableSentryBrowser };
