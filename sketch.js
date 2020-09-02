let graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D(config);
}

function draw() {
  background(220);
  graph2D.draw();
}

const colorConfig = {
  axis: [255, 255, 255],
  background: [0, 0, 0],
};

const basicConfig = {
  x: 10,
  y: 10,
  w: 400,
  h: 200,
  originX: 100,
  originY: 50,
  unitX: 10,
  unitY: 10,
  unitXDivisions: 2,
  unitYDivisions: 2,
};

const strokeWeightConfig = {
  axis: 2,
};

const config = {
  basicConfig,
  colorConfig,
  strokeWeightConfig,
};
