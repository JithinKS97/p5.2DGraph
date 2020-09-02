class Graph2D {
  x: number;
  y: number;
  w: number;
  h: number;
  origin: p5.Vector;

  axisColor: Array<number>;
  backgroundColor: Array<number>;

  axisStrokeWeight: number;

  constructor(config: Config) {
    const { basicConfig, colorConfig, strokeWeightConfig } = config;

    const { x, y, w, h, originX, originY } = basicConfig;
    const { axis: axisColor, background: backgroundColor } = colorConfig;
    const { axis: axisStrokeWeight } = strokeWeightConfig;

    this.origin = createVector();

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.origin.set(originX, originY);

    this.axisColor = axisColor;
    this.backgroundColor = backgroundColor;

    this.axisStrokeWeight = axisStrokeWeight;
  }

  public draw(): void {
    push();
    translate(this.x, this.y);
    this.drawRect();
    this.drawAxes();
    pop();
  }

  private drawAxes(): void {
    stroke(this.axisColor);
    strokeWeight(this.axisStrokeWeight);
    line(0, this.origin.y, this.w, this.origin.y);
    line(this.origin.x, 0, this.origin.x, this.h);
  }

  private drawRect() {
    fill(this.backgroundColor);
    rect(0, 0, this.w, this.h);
  }
}
