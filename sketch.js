let ROWS = 20;
let COLS = 20;
let SHAPE_SIZE = 20;

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
let MARGIN;
let PADDING;

let GRIDBOX;
let START;

let totalX;
let totalY;

function setup() {
  colorMode(HSB);

  // UI DOM ELEMENTS
  const ui = createDiv();

  rowSlider = createSlider(1, 50, 20, 1).parent(ui);
  colSlider = createSlider(1, 50, 20, 1).parent(ui);
  shapeSizeSlider = createSlider(10, 30, 20, 1).parent(ui);

  primaryColorPicker = createColorPicker(color(245, 85, 25)).parent(ui);
  secondaryColorPicker = createColorPicker(color(160, 55, 75)).parent(ui);
  backgroundColorPicker = createColorPicker(color(125, 25, 100)).parent(ui);

  // LAYOUT
  calculateLayout();
  createCanvas(totalX, totalY, SVG);

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

  // PALETTE = dynamicTheme;
  calculatePalette();
}

function draw() {
  // LAYOUT
  calculateLayout();
  resizeCanvas(totalX, totalY);

  calculatePalette();
  background(PALETTE[2]);

  // BORDER
  push();
  noFill();
  stroke(PALETTE[0]);
  translate(width / 2, height / 2);
  rect(0, 0, totalX - MARGIN, totalY - MARGIN);
  pop();

  // GRID
  // createGrid(colSlider.value(), rowSlider.value());

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

  // let rand = randomSlider.value();
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

function calculateLayout() {
  SHAPE_SIZE = shapeSizeSlider.value();

  MARGIN = SHAPE_SIZE * 4;
  PADDING = SHAPE_SIZE * 0.2;

  GRIDBOX = SHAPE_SIZE + PADDING;
  START = SHAPE_SIZE + MARGIN;

  totalX = START + MARGIN + GRIDBOX * colSlider.value();
  totalY = START + MARGIN + GRIDBOX * rowSlider.value();
}

function calculatePalette() {
  dynamicTheme = [
    primaryColorPicker.value(),
    secondaryColorPicker.value(),
    backgroundColorPicker.value(),
  ];

  PALETTE = dynamicTheme;
}
