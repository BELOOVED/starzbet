import clsx from "clsx";
import {
  type CSSProperties,
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type ReactElement,
  type ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { isNotNil } from "@sb/utils";
import classes from "./BaseCdnIcon.module.css";

const CDN_URL = "https://cdn.erisgaming.com";

type TQaAttr = Record<string, never> | { ["data-cy"]: string; };

type TCdnIconSize = 32 | 48;

const qaAttr = (attribute?: string): TQaAttr => isNotNil(attribute) ? { ["data-cy"]: attribute } : {};

const getCdnIconName = (fileName: string) => `${fileName}@2x`;

type TNativeHtmlProps = DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>;

interface ICdnIconWithFallbackProps extends Omit<TNativeHtmlProps, "children"> {
  size: TCdnIconSize;
  alt: string;
  className?: string;
  qaAttribute?: string;
  children: () => ReactElement | null;
  path: string;
  style?: CSSProperties;
  withoutLazy?: boolean;
}

type TState = {
  isLoading: boolean;
  hasError: boolean;
}

/**
 * This cache stores successfully loaded cdn icons urls in whole application
 */
const cache = new Map<string, boolean>();

const BaseCdnIcon: FC<ICdnIconWithFallbackProps> = (({
  className,
  qaAttribute,
  path,
  children,
  alt,
  withoutLazy = false,
  ...props
}) => {
  const url = `${CDN_URL}${path}`;

  const isCached = cache.has(url);

  const [internalClassName, setInternalClassName] = useState<string | undefined>(isCached ? classes.afterLoad : classes.initial);

  const ref = useRef<HTMLImageElement | null>(null);

  const [state, setState] = useState<TState>({
    /**
     * If url has been loaded successfully early, we don't need to reload it with fallback component
     */
    isLoading: !isCached,
    hasError: false,
  });

  useEffect(
    () => {
      const element = ref.current;

      if (element === null) {
        return;
      }

      if (!state.isLoading && !state.hasError) {
        cache.set(url, true);

        setInternalClassName(classes.afterLoad);
      }
    },
    [state.isLoading],
  );

  const loadEndHandler: ReactEventHandler<HTMLImageElement> = () => {
    setState(
      (prev) => ({
        ...prev,
        isLoading: false,
      }),
    );
  };

  const errorHandler: ReactEventHandler<HTMLImageElement> = () => {
    setState({
      hasError: true,
      isLoading: false,
    });
  };

  return (
    <>
      <div className={clsx(internalClassName, className)} key={internalClassName}>
        <img
          {...props}
          ref={ref}
          alt={alt}
          src={url}
          className={classes.base}
          onError={errorHandler}
          onLoad={loadEndHandler}
          loading={withoutLazy ? undefined : "lazy"}
          {...qaAttr(qaAttribute)}
        />
      </div>

      {state.isLoading || state.hasError ? children() : null}
    </>
  );
});
BaseCdnIcon.displayName = "BaseCdnIcon";

export type { ICdnIconWithFallbackProps, TCdnIconSize };
export { BaseCdnIcon, getCdnIconName };
