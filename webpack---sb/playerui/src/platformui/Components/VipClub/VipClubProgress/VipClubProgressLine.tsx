import { type CSSProperties, type FC, type PropsWithChildren } from "react";

interface IVipClubProgressLineProps extends IWithClassName, PropsWithChildren {
  progressPercent: number;
  backgroundColor?: string;
}

const STYLE: CSSProperties = {
  transition: "width 2s ease",
};

const VipClubProgressLine: FC<IVipClubProgressLineProps> = ({
  progressPercent,
  backgroundColor,
  className,
  children,
}) => {
  const callbackRef = (node: HTMLDivElement | null) => {
    if (node === null) {
      return;
    }

    requestAnimationFrame(() => {
      node.style.width = `${progressPercent < 1 && progressPercent > 0 ? 1 : progressPercent}%`;
      if (backgroundColor) {
        node.style.backgroundColor = backgroundColor;
      }
    });
  };

  return (
    <div
      style={STYLE}
      ref={callbackRef}
      className={className}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progressPercent}
      role={"progressbar"}
    >
      {children}
    </div>
  );
};
VipClubProgressLine.displayName = "VipClubProgressLine";

export { VipClubProgressLine };
