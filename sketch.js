let graph2D;

function setup() {
  const cnv = createCanvas(640, 400);
  cnv.parent("sketch-holder");
  createConfigEditElements(config);
  graph2D = new Graph2D(config);
}

function initialize(newConfig) {
  graph2D = new Graph2D(newConfig);
}

function draw() {
  background(20);
  drawGraph();
}

function drawGraph() {
  graph2D.display();
  graph2D.drawMainGrid();
  graph2D.drawSubGrid();
  graph2D.pan();
  graph2D.zoom();
  graph2D.plot(`x*x`);
}
