const log = (text) => {
  console.info(`%c[performance][${Date.now()}]: ${text}`, "color: cyan");
};

const logMeasure = (perf: PerformanceMeasure) => {
  log(`${perf.name} in ${perf.duration}`);
};

const measureMap = {};

let measureCleared = false;

let supported = true;

const notSupported = () => {
  supported = false;

  log("This browser does not support the performance.measure method");

  try {
    clearMeasures();
  } catch (e) {

  }
};

const doMeasure = (text: string) => {
  if(measureMap[text] || measureCleared || !supported){
    return;
  }

  measureMap[text] = true;

  const perf = performance.measure(text, "[performance][start]");

  logMeasure(perf);
};

const measure = (text: string) => {
  try {
    doMeasure(text);
  } catch (e) {
    notSupported();
  }
};

const firstMeasure = () => {
  if (!window.performance || !performance.measure) {
    notSupported();

    return;
  }

  try {
    doMeasure("js started executing");
  } catch (e) {
    performance.mark("[performance][start]");

    const now = new Date();

    log(`first mark not found, js started executing in ${now.toLocaleTimeString()}:${now.getMilliseconds()}`);
  }

  setTimeout(clearMeasures, 15 * 1000);
};

const clearMeasures = () => {
  if(measureCleared){
    return;
  }

  performance.clearMarks("[performance][start]");
  performance.clearMeasures();

  measureCleared = true;

  log("stop measure");
};

export { measure, firstMeasure };
