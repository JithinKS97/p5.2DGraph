let graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D(config);
}

function draw() {
  background(20);
  graph2D.display();
  graph2D.drawMainGrid();
  graph2D.pan();
}

const colorConfig = {
  axis: 255,
  background: 0,
  boundary: 100,
  mainGrid: 100,
};

const basicConfig = {
  x: 10,
  y: 10,
  w: 500,
  h: 300,
  originX: 100,
  originY: 50,
  unitX: 30,
  unitY: 30,
  unitXDivisions: 2,
  unitYDivisions: 2,
};

const strokeWeightConfig = {
  axis: 2,
  boundary: 1,
  mainGrid: 1,
};

const config = {
  basicConfig,
  colorConfig,
  strokeWeightConfig,
};
