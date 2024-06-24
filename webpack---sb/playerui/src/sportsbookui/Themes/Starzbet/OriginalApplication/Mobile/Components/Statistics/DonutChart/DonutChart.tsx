import { createRef, type CSSProperties, memo, useEffect } from "react";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { type ICurrentFormStats } from "../../../../../../../Store/Statistics/Selectors/CurrentFormStats";

const WIDTH = IS_MOBILE_CLIENT_SIDE ? 92 : 110;
const HEIGHT = IS_MOBILE_CLIENT_SIDE ? 92 : 110;

const x = WIDTH / 2;
const y = HEIGHT / 2;
const radius = 40;
const offset = 0.3;
const lineWidth = 5;
const winLineWidth = 7;

const result = {
  win: "win",
  loss: "loss",
  draw: "draw",
};

const colors = {
  [result.draw]: "#FFDE00",
  [result.loss]: "#FF3A3A",
  [result.win]: "#6FC51A",
};

const setupCanvas = (canvas) => {
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = WIDTH * dpr;
  canvas.height = HEIGHT * dpr;
  const ctx = canvas.getContext("2d");
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);

  return ctx;
};

const draw = (canvas, ptc) => {
  const ctx = setupCanvas(canvas);

  ctx.lineCap = "round";

  let df = 0;

  Object.keys(result)
    .filter((key) => Number(ptc[key]) !== 0)
    .forEach((key) => {
      const part = Number(ptc[key]);

      ctx.lineWidth = key === result.win
        ? winLineWidth
        : lineWidth;

      ctx.beginPath();

      ctx.strokeStyle = colors[key];

      ctx.arc(x, y, radius, df + offset, df + ((Math.PI * 2) * (part / 100)));

      ctx.stroke();

      df += (Math.PI * 2) * (part / 100);
    });
};

const style: CSSProperties = { width: WIDTH, height: HEIGHT };

const DonutChart = memo<Pick<ICurrentFormStats, "ptc">>(({ ptc }) => {
  const ref = createRef<HTMLCanvasElement>();

  useEffect(
    () => {
      draw(ref.current, ptc);
    },
    [],
  );

  return (
    <canvas ref={ref} style={style} />
  );
});
DonutChart.displayName = "DonutChart";

export { DonutChart };
