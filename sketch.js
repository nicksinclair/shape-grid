let ROWS = 20;
let COLS = 20;
let SHAPE_SIZE = 20;

let prev_rows = ROWS;
let prev_cols = COLS;
let prevShapeSize = SHAPE_SIZE;

// UI DOM ELEMENTS
let rowSlider;
let columnSlider;
let shapeSizeSlider;

let primaryColorPicker;
let secondaryColorPicker;
let backgroundColorPicker;

// THEMES
let dynamicTheme = [];
let theme1 = [];
let theme2 = [];
let theme3 = [];
let PALETTE = [];

// LAYOUT
// let MARGIN;
// let PADDING;

// let GRIDBOX;
// let START;

// let totalX;
// let totalY;

let MARGIN = SHAPE_SIZE * 4;
let PADDING = SHAPE_SIZE * 0.2;

let GRIDBOX = SHAPE_SIZE + PADDING;
let START = SHAPE_SIZE + MARGIN;

let totalX = START + MARGIN + GRIDBOX * COLS;
let totalY = START + MARGIN + GRIDBOX * ROWS;

// SHAPES
const shapes = [];

function setup() {
  pixelDensity(1);
  colorMode(HSB);

  let maxRows = ceil((windowHeight - (START + MARGIN)) / GRIDBOX);
  let maxCols = floor((windowWidth - (START + MARGIN + 350)) / GRIDBOX);

  // UI DOM ELEMENTS
  const ui = createDiv().class("control-panel");

  rowSlider = createSlider(2, maxRows, 10, 1).parent(ui);
  colSlider = createSlider(2, maxCols, 10, 1).parent(ui);
  // shapeSizeSlider = createSlider(10, 30, 10, 1).parent(ui);

  primaryColorPicker = createColorPicker(color(245, 85, 25)).parent(ui);
  secondaryColorPicker = createColorPicker(color(160, 55, 75)).parent(ui);
  backgroundColorPicker = createColorPicker(color(125, 25, 100)).parent(ui);

  // LAYOUT
  // calculateLayout();
  createCanvas(totalX, totalY, SVG);

  console.log(windowWidth);

  // MODES
  rectMode(CENTER);
  angleMode(DEGREES);

  // COLOR
  theme1 = [
    color(245, 85, 25), // dark blue
    color(160, 55, 75), // green
    color(125, 25, 100), // light green
  ];

  theme2 = [
    color(275, 85, 30), // purple
    color(312, 30, 80), // pink
    color(288, 10, 100), // lavender
  ];

  theme3 = [
    color(25, 85, 70), // orange
    color(58, 85, 70), // yellow
    color(65, 30, 85), // light yellow
  ];

  calculatePalette();

  // SHAPES
  generateShapes();
}

function draw() {
  // LAYOUT
  calculateLayout();
  resizeCanvas(totalX, totalY);

  // COLOR
  calculatePalette();
  background(PALETTE[2]);
  noFill();
  noStroke();

  // generateShapes();

  // SHAPE GRID
  shapes.forEach((shape) => {
    push();
    translate(shape.x, shape.y);
    shape.update();
    shape.render();
    pop();
  });

  // BORDER
  push();
  noFill();
  stroke(PALETTE[0]);
  translate(width / 2, height / 2);
  rect(0, 0, totalX - MARGIN, totalY - MARGIN);
  pop();

  // noLoop();
}

function createGrid(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const posX = START + x * GRIDBOX;
      const posY = START + y * GRIDBOX;

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

function generateShapes() {
  shapes.splice(0, shapes.length);

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = START + x * GRIDBOX;
      const posY = START + y * GRIDBOX;

      shapes.push(new Shape(posX, posY));
    }
  }
}

function calculateLayout() {
  ROWS = rowSlider.value();
  COLS = colSlider.value();

  if (evaluateResize()) {
    generateShapes();
  }

  prev_rows = ROWS;
  prev_cols = COLS;

  MARGIN = SHAPE_SIZE * 4;
  PADDING = SHAPE_SIZE * 0.2;

  GRIDBOX = SHAPE_SIZE + PADDING;
  START = SHAPE_SIZE + MARGIN;

  totalX = START + MARGIN + GRIDBOX * COLS;
  totalY = START + MARGIN + GRIDBOX * ROWS;
}

function calculatePalette() {
  dynamicTheme = [
    primaryColorPicker.color(),
    secondaryColorPicker.color(),
    backgroundColorPicker.color(),
  ];

  PALETTE = dynamicTheme;
}

function evaluateResize() {
  if (prev_rows != ROWS) {
    return true;
  }
  if (prev_cols != COLS) {
    return true;
  }
}
