let isScrolling: any;

class Graph2D {
  pos: p5.Vector;
  w: number;
  h: number;
  origin: p5.Vector;
  unitX: number;
  unitY: number;

  axisColor: p5.Color;
  backgroundColor: p5.Color;
  boundaryColor: p5.Color;
  mainGridColor: p5.Color;

  axisStrokeWeight: number;
  boundaryStrokeWeight: number;
  mainGridStrokeWight: number;

  // Extra params which are not accepted from user
  isZooming: boolean;
  zoomStartOriginX: number;
  zoomStartOriginY: number;
  unitX0: number;
  unitY0: number;
  isZoomEnabled: boolean;

  constructor(config: Config) {
    const { basicConfig, colorConfig, strokeWeightConfig } = config;

    const { x, y, w, h, originX, originY, unitX, unitY } = basicConfig;

    const {
      axis: axisColor,
      background: backgroundColor,
      boundary: boundaryColor,
      mainGrid: mainGridColor,
    } = colorConfig;

    const {
      axis: axisStrokeWeight,
      boundary: boundaryStrokeWeight,
      mainGrid: mainGridStrokeWeight,
    } = strokeWeightConfig;

    this.origin = createVector();
    this.pos = createVector();

    this.w = w;
    this.h = h;
    this.unitX = unitX;
    this.unitY = unitY;
    this.origin.set(originX, originY);
    this.pos.set(x, y);

    this.axisColor = axisColor;
    this.backgroundColor = backgroundColor;
    this.boundaryColor = boundaryColor;
    this.mainGridColor = mainGridColor;

    this.axisStrokeWeight = axisStrokeWeight;
    this.boundaryStrokeWeight = boundaryStrokeWeight;
    this.mainGridStrokeWight = mainGridStrokeWeight;

    // Additional properties that are not accepted from user
    this.isZooming = false;
    this.zoomStartOriginX = originX;
    this.zoomStartOriginY = originY;
    this.unitX0 = unitX;
    this.unitY0 = unitY;
    this.isZoomEnabled = false;

    //@ts-ignore
    _curElement.mouseWheel(this.handleScroll);
  }

  /**
   * Draws the graph bounding box with axes
   */
  public display() {
    push();
    translate(this.pos.x, this.pos.y);
    this.drawBoundingRect();
    this.drawAxes();
    pop();
  }

  /**
   * Draws the main grid in the graph
   */
  public drawMainGrid() {
    push();
    stroke(this.mainGridColor);
    strokeWeight(this.mainGridStrokeWight);
    translate(this.pos.x, this.pos.y);
    this.drawMainVerticalGridLines();
    this.drawMainHorizontalGridLines();
    pop();
  }

  /**
   * To activate the pan feature in the graph
   * Call inside draw loop
   */
  public pan() {
    if (mouseIsPressed && this.isPtWithinGraph(mouseX, mouseY)) {
      this.origin.x += mouseX - pmouseX;
      this.origin.y += mouseY - pmouseY;
    }
  }

  public zoom() {
    this.isZoomEnabled = true;
  }

  private handleScroll = (e: MouseWheelEvent) => {
    if (!this.isZooming) {
      this.isZooming = true;
      this.setZoomStartOrigin();
    }

    this.resetZoomParamsWhenScrollFinished();

    const xp = e.offsetX - this.pos.x;
    const yp = e.offsetY - this.pos.y;

    if (!this.isPtWithinGraph(xp, yp)) {
      return;
    }

    if (e.deltaY >= 0) {
      this.zoomOnScroll("in", xp, yp);
    } else {
      this.zoomOnScroll("out", xp, yp);
    }
  };

  private setZoomStartOrigin = () => {
    this.zoomStartOriginX = this.origin.x;
    this.zoomStartOriginY = this.origin.y;
  };

  private resetZoomParamsWhenScrollFinished = () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      this.isZooming = false;
      this.unitX0 = this.unitX;
      this.unitY0 = this.unitY;
    }, 100);
  };

  /**
   *
   * @param mode Zoom in or out
   * @param xp x coordinate of pivot point
   * @param yp y coordinate of pivot point
   */
  private zoomOnScroll(mode: string, xp: number, yp: number) {
    if (!this.isZoomEnabled) {
      return;
    }

    let scaleRate: number = 1;

    if (mode === "in") {
      scaleRate = 1.05;
    } else if (mode === "out") {
      scaleRate = 0.95;
    }
    this.unitX *= scaleRate;
    this.unitY *= scaleRate;

    const scaleX: number = this.unitX / this.unitX0;
    const scaleY: number = this.unitY / this.unitY0;

    /**
     * Logic for scaling
     *
     * The coordinates of origin is changed wrt zooming
     * New origin coordinate = Pivot coordinate + Initial origin coordinate * scaleFactor
     */
    this.origin.x = xp - (xp - this.zoomStartOriginX) * scaleX;
    this.origin.y = yp - (yp - this.zoomStartOriginY) * scaleY;
  }

  private drawAxes() {
    stroke(this.axisColor);
    strokeWeight(this.axisStrokeWeight);
    this.drawVerticalGridLine(this.origin.x);
    this.drawHorizontalGridLine(this.origin.y);
  }

  private drawBoundingRect() {
    fill(this.backgroundColor);
    strokeWeight(this.boundaryStrokeWeight);
    stroke(this.boundaryColor);
    rect(0, 0, this.w, this.h);
  }

  private drawMainVerticalGridLines() {
    let xStart = this.origin.x + this.unitX;
    let xEnd = this.w;
    for (let x = xStart; x < xEnd; x += this.unitX) {
      this.drawVerticalGridLine(x);
    }

    xStart = this.origin.x;
    xEnd = 0;
    for (let x = xStart; x > xEnd; x -= this.unitX) {
      this.drawVerticalGridLine(x);
    }
  }

  private drawMainHorizontalGridLines() {
    let yStart = this.origin.y + this.unitY;
    let yEnd = this.h;
    for (let y = yStart; y < yEnd; y += this.unitY) {
      this.drawHorizontalGridLine(y);
    }

    yStart = this.origin.y - this.unitY;
    yEnd = 0;
    for (let y = yStart; y > yEnd; y -= this.unitY) {
      this.drawHorizontalGridLine(y);
    }
  }

  private drawVerticalGridLine(x: number) {
    if (this.isXWithinGraph(x)) {
      line(x, 0, x, this.h);
    }
  }

  private drawHorizontalGridLine(y: number) {
    if (this.isYWithinGraph(y)) {
      line(0, y, this.w, y);
    }
  }

  private isXWithinGraph(x: number) {
    return x < this.w && x > 0;
  }

  private isYWithinGraph(y: number) {
    return y < this.h && y > 0;
  }

  private isPtWithinGraph = (x: number, y: number) =>
    this.isXWithinGraph(x - this.pos.x) && this.isYWithinGraph(y - this.pos.y);
}
