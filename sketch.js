const SHAPE_SIZE = 30;

let theme1 = [];
let theme2 = [];
let theme3 = [];
let PALETTE = [];

const ROWS = 30;
const COLS = 30;


const MARGIN = SHAPE_SIZE * 4;
const PADDING = SHAPE_SIZE * 0.2;

const GRIDBOX = SHAPE_SIZE + PADDING;
const START = SHAPE_SIZE + MARGIN;

// SLIDERS
let randomSlider;

function setup() {
  const totalX = START + MARGIN + GRIDBOX * COLS;
  const totalY = START + MARGIN + GRIDBOX * ROWS;
  createCanvas(totalX, totalY, SVG);
  
  // MODES
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB);
  
  // COLOR
  theme1 = [
    color(245, 85, 25), // dark blue
    color(160, 55, 75), // green
    color(125, 25, 100) // light green
  ];
  
  theme2 = [
    color(275, 85, 30), // purple
    color(312, 30, 80), // pink
    color(288, 10, 100) // lavender
  ];
  
  theme3 = [
    color(25, 85, 70), // orange
    color(58, 85, 70), // yellow
    color(65, 30, 85) // light yellow
  ];
  
  PALETTE = theme3;
  
  // SLIDERS
  randomSlider = createSlider(1, 10, 3, 1);
}

function draw() {
  background(PALETTE[2]);
  
  // BORDER
  push();
  noFill();
  stroke(PALETTE[0]);
  translate(width / 2, height / 2);
  rect(0, 0, START + (GRIDBOX * COLS), START + (GRIDBOX * ROWS))
  pop();
  
  // GRID
  createGrid(ROWS, COLS);
  
  noLoop();
}

function createGrid(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for(let y = 0; y < cols; y++) {
      const posX = START + (x * GRIDBOX);
      const posY = START + (y * GRIDBOX);
      
      push();
      drawShape(posX, posY);
      pop();
    }
  }
}

function drawShape(posX, posY) {
  const color = getRandomFromPalette();
  
  noFill();
  noStroke();
  
  if (randomSelectTwo()) {
    fill(color);
  } else {
    stroke(color);
  }

  let rand = randomSlider.value();
  const shapeSelection = floor(random(3));

  translate(posX, posY);
  if (shapeSelection == 0) {
    rect(0, 0, SHAPE_SIZE);
  } else if (shapeSelection == 1) {
    ellipse(0, 0, SHAPE_SIZE);
  } else if (shapeSelection == 2) {
    applyRotation();
    rightTriangle(0, 0, SHAPE_SIZE);
  } else {
    // skip drawing a shape
  }
}



