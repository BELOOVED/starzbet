
interface IWebsocketUrlResolverConfig {
  baseUrl: string;
  prefix?: string;
}

type TProtocol = "http:" | "https:" | "ws:" | "wss:";

const getSocketPath = (host: string, prefix?: string) =>
  `${host}?${prefix ?? ""}`;

const getSchema = (protocol: TProtocol, localhost: boolean) => {
  if (localhost) {
    return "ws";
  }

  switch (protocol) {
    case "http:":
    case "ws:":
      return "ws";

    case "https:":
    case "wss:":
      return "wss";

    default:
      return "wss";
  }
};

const websocketUrlResolver = ({
  baseUrl,
  prefix,
}: IWebsocketUrlResolverConfig): string => {
  const [
    protocol = window.location.protocol,
    host = window.location.host,
  ] = baseUrl.split("//");

  const localhost = !!new RegExp(/localhost/).exec(baseUrl);

  return `${getSchema(protocol as TProtocol, localhost)}://${getSocketPath(host, prefix)}`;
};

export { type IWebsocketUrlResolverConfig, websocketUrlResolver };
