import { memo, useEffect, useRef } from "react";
import { disposeVisibleCaptcha, runVisibleCaptcha, type TTurnstileViewOptions } from "./CloudflareToken";

interface IWithClassName {
    className?: string;
}

interface ICloudflareTurnstileProps extends TTurnstileViewOptions, IWithClassName {
    visible?: boolean;
}

interface ICloudflareTurnstileVisibleProps extends TTurnstileViewOptions, IWithClassName {
}

const CloudflareTurnstileVisible = memo<ICloudflareTurnstileVisibleProps>(({ theme, size, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (ref.current) {
        void runVisibleCaptcha(ref.current, { theme, size });
      }

      return () => void disposeVisibleCaptcha();
    },
    [],
  );

  return (<div ref={ref} className={className} />);
});
CloudflareTurnstileVisible.displayName = "CloudflareTurnstileVisible";

// eslint-disable-next-line rulesdir/no-truethly-default-assign
const CloudflareTurnstile = memo<ICloudflareTurnstileProps>(({ visible = true, ...rest }) => {
  if(!visible){
    return null;
  }

  return <CloudflareTurnstileVisible {...rest} />;
});
CloudflareTurnstile.displayName = "CloudflareTurnstile";

export { CloudflareTurnstile };
