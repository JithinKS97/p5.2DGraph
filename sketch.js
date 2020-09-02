let graph2D

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D();
}

function draw() {
  background(220);
  graph2D.draw();
}