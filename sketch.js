let graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D(config);
}

function draw() {
  background(20);
  graph2D.display();
  graph2D.drawMainGrid();
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
  w: 400,
  h: 200,
  originX: 100,
  originY: 50,
  unitX: 20,
  unitY: 20,
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
