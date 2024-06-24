import { lazy, memo, Suspense, useEffect, useState } from "react";
import { extractDefaultExport } from "@sb/utils";
import { type IMetadata } from "@sb/network-bus/Model";
import { type TToken } from "./TToken";

type TConfigure = (config: {metadata: IMetadata;} | null) => void;

type TListener = (enabled: boolean) => void;

type TMode = {
  enabled: boolean;
  addListener: (listener: TListener) => void;
};

type TControl = {
  mode: TMode;
  configure: TConfigure;
}

type TAuthProps = {
  proxyUrl: string;
  controls: TControl[];
};

const ACCESS_TOKEN_NAME = "operatorAccessToken";

const LazyForm = lazy(() => import("./Form").then(extractDefaultExport("Form")));

const useModeEnabled = (modes: TMode[]) => {
  const [enables, setEnables] = useState(modes.map(({ enabled }) => enabled));

  useEffect(
    () => {
      modes.forEach((mode, index) => {
        mode.addListener((enabled) => {
          setEnables((prevEnables) => {
            const newEnables = [...prevEnables];
            newEnables[index] = enabled;

            return newEnables;
          });
        });
      });
    },
    [modes],
  );

  return enables.some((enabled) => enabled);
};

const useToken = (configures: TConfigure[]) => {
  const [token, setToken] = useState<null | TToken>(null);

  useEffect(
    () => {
      if (token) {
        //set
        configures.forEach(
          (configure) => {
            configure({
              metadata: {
                [ACCESS_TOKEN_NAME]: token.accessToken,
              },
            });
          },
        );

        const id = setTimeout(
          () => {
            setToken(null);
          },
          token.accessTokenInMs,
        );

        return () => {
          clearTimeout(id);
        };
      }
      //clear
      configures.forEach(
        (configure) => {
          configure(null);
        },
      );

      return () => null;
    },
    [token],
  );

  return [token, setToken] as const;
};

const Auth = memo<TAuthProps>(({
  proxyUrl,
  controls,
}) => {
  const modeEnabled = useModeEnabled(
    controls.map(({ mode }) => mode),
  );

  const [token, setToken] = useToken(
    controls.map(({ configure }) => configure),
  );

  if (!modeEnabled || token) {
    return null;
  }

  return (
    <Suspense>
      <LazyForm proxyUrl={proxyUrl} onSuccess={setToken} />
    </Suspense>
  );
});
Auth.displayName = "Auth";

export { type TAuthProps, Auth };
