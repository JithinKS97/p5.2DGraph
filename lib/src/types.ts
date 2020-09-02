interface Config {
  basicConfig: BasicConfig;
  colorConfig: ColorConfig;
  strokeWeightConfig: StrokeWeightConfig;
}

interface ColorConfig {
  axis: Array<number>;
  background: Array<number>;
}

interface StrokeWeightConfig {
  axis: number;
}

interface BasicConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  originX: number;
  originY: number;
}
