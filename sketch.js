let graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D(graphConfig);
}

function draw() {
  background(220);
  graph2D.draw();
}

/**
 * Config for graph
 */

const colorConfig = {
  axes: [0, 0, 0],
};

const graphConfig = {
  colorConfig,
};
