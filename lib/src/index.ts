class Graph2D {
  colorConfig: ColorConfig;

  constructor({ colorConfig }: Graph2DConfig) {
    this.colorConfig = colorConfig;
  }

  drawAxes() {
    stroke(this.colorConfig.axes);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
  }

  draw() {
    this.drawAxes();
  }
}
