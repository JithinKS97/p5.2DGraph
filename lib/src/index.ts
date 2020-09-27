let isScrolling: any;

class Graph2D {
  pos: p5.Vector;
  w: number;
  h: number;
  origin: p5.Vector;
  unitX: number;
  unitY: number;
  unitXDivisions: number;
  unitYDivisions: number;

  axisColor: p5.Color;
  backgroundColor: p5.Color;
  boundaryColor: p5.Color;
  mainGridColor: p5.Color;
  subGridColor: p5.Color;

  axisStrokeWeight: number;
  boundaryStrokeWeight: number;
  mainGridStrokeWeight: number;
  subGridStrokeWeight: number;

  // Extra params which are not accepted from user
  isZooming: boolean;
  zoomStartOriginX: number;
  zoomStartOriginY: number;
  unitX0: number;
  unitY0: number;
  isZoomEnabled: any;
  plottedEquations: Set<string>;

  constructor(config: Config) {
    const { basicConfig, colorConfig, strokeWeightConfig } = config;

    const {
      x,
      y,
      w,
      h,
      originX,
      originY,
      unitX,
      unitY,
      unitXDivisions,
      unitYDivisions,
    } = basicConfig;

    const {
      axis: axisColor,
      background: backgroundColor,
      boundary: boundaryColor,
      mainGrid: mainGridColor,
      subGrid: subGridColor,
    } = colorConfig;

    const {
      axis: axisStrokeWeight,
      boundary: boundaryStrokeWeight,
      mainGrid: mainGridStrokeWeight,
      subGrid: subGridStrokeWeight,
    } = strokeWeightConfig;

    this.origin = createVector();
    this.pos = createVector();

    this.w = w;
    this.h = h;
    this.unitX = unitX;
    this.unitY = unitY;
    this.origin.set(originX, originY);
    this.pos.set(x, y);
    this.unitXDivisions = unitXDivisions;
    this.unitYDivisions = unitYDivisions;

    this.axisColor = axisColor;
    this.backgroundColor = backgroundColor;
    this.boundaryColor = boundaryColor;
    this.mainGridColor = mainGridColor;
    this.subGridColor = subGridColor;

    this.axisStrokeWeight = axisStrokeWeight;
    this.boundaryStrokeWeight = boundaryStrokeWeight;
    this.mainGridStrokeWeight = mainGridStrokeWeight;
    this.subGridStrokeWeight = subGridStrokeWeight;

    // Additional properties that are not accepted from user
    this.isZooming = false;
    this.zoomStartOriginX = originX;
    this.zoomStartOriginY = originY;
    this.unitX0 = unitX;
    this.unitY0 = unitY;
    this.isZoomEnabled = false;
    this.plottedEquations = new Set();

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
    strokeWeight(this.mainGridStrokeWeight);
    translate(this.pos.x, this.pos.y);
    this.drawMainVerticalGridLines();
    this.drawMainHorizontalGridLines();
    pop();
  }

  public drawSubGrid() {
    push();
    stroke(this.subGridColor);
    strokeWeight(this.subGridStrokeWeight);
    translate(this.pos.x, this.pos.y);
    this.drawVerticalSubGridLines();
    this.drawHorizontalSubGridLines();
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
    this.disableZoomIfTimeout();
  }

  public plot(expr: string) {
    this.plottedEquations.add(expr);
    this.plotEquations(Array.from(this.plottedEquations));
  }

  private plotEquations(equations: string[]) {
    equations.forEach((equation) => this.plotEquation(equation));
  }

  private drawBoundingRect() {
    fill(this.backgroundColor);
    strokeWeight(this.boundaryStrokeWeight);
    stroke(this.boundaryColor);
    rect(0, 0, this.w, this.h);
  }

  private drawAxes() {
    stroke(this.axisColor);
    strokeWeight(this.axisStrokeWeight);
    this.drawVerticalGridLine(this.origin.x);
    this.drawHorizontalGridLine(this.origin.y);
  }

  private drawMainVerticalGridLines() {
    let xStart = this.origin.x + this.unitX;
    let xEnd = this.w;
    for (let x = xStart; x < xEnd; x += this.unitX) {
      this.drawVerticalGridLine(x);
    }

    xStart = this.origin.x - this.unitX;
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

  private drawVerticalSubGridLines() {
    let step = this.unitX;

    // To avoid zero division error
    if (this.unitXDivisions !== 0) step = this.unitX / this.unitXDivisions;

    let xStart = this.origin.x + step;
    let xEnd = this.w;
    for (let x = xStart, counter = 1; x < xEnd; x += step, counter++) {
      // Counter to ensure sub grid lines are not drawn over
      // main grid lines
      if (counter % this.unitXDivisions !== 0) {
        this.drawVerticalGridLine(x);
      }
    }
    xStart = this.origin.x - step;
    xEnd = 0;
    for (let x = xStart, counter = 1; x > xEnd; x -= step, counter++) {
      if (counter % this.unitXDivisions !== 0) {
        this.drawVerticalGridLine(x);
      }
    }
  }

  private drawHorizontalSubGridLines() {
    let step = this.unitY;

    if (this.unitYDivisions !== 0) step = this.unitY / this.unitYDivisions;

    let yStart = this.origin.y + step;
    let yEnd = this.h;
    for (let y = yStart, counter = 1; y < yEnd; y += step, counter++) {
      if (counter % this.unitYDivisions !== 0) {
        this.drawHorizontalGridLine(y);
      }
    }
    yStart = this.origin.y - step;
    yEnd = 0;
    for (let y = yStart, counter = 1; y > yEnd; y -= step, counter++) {
      if (counter % this.unitYDivisions !== 0) {
        this.drawHorizontalGridLine(y);
      }
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

  private disableZoomIfTimeout() {
    clearTimeout(this.isZoomEnabled);
    this.isZoomEnabled = setTimeout(() => {
      this.isZoomEnabled = false;
    }, 100);
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

  private isXWithinGraph(x: number) {
    return x < this.w && x > 0;
  }

  private isYWithinGraph(y: number) {
    return y < this.h && y > 0;
  }

  private isPtWithinGraph = (x: number, y: number) =>
    this.isXWithinGraph(x - this.pos.x) && this.isYWithinGraph(y - this.pos.y);

  private getX = (xPixel: number) => {
    return (xPixel - this.pos.x - this.origin.x) / this.unitX;
  };

  private getY = (yPixel: number) => {
    return (yPixel - this.pos.y - this.origin.y) / -this.unitY;
  };

  private getXPixel = (x: number) => {
    return this.pos.x + this.origin.x + x * this.unitX;
  };

  private getYPixel = (y: number) => {
    return this.pos.y + this.origin.y - y * this.unitY;
  };

  plotEquation = (equation: string) => {
    const leftMostX = this.getX(0);
    const rightMostX = this.getX(width);
    const noOfSamples = width / (this.unitX / 30);
    let interval = (rightMostX - leftMostX) / noOfSamples;
    const xCoords = [];
    for (let x = leftMostX; x < rightMostX; x += interval) {
      xCoords.push(x);
    }
    const yCoords = xCoords.map(f(equation));
    for (let i = 1; i < xCoords.length; i++) {
      stroke(255, 0, 0);
      strokeWeight(1.5);
      smooth();

      line(
        this.getXPixel(xCoords[i - 1]),
        this.getYPixel(yCoords[i - 1]),
        this.getXPixel(xCoords[i]),
        this.getYPixel(yCoords[i])
      );
    }
  };
}

const f = (equation: string) => (x: number) => {
  return eval(equation);
};
