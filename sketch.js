p5.disableFriendlyErrors = true;

let ROWS = 10;
let COLS = 10;
let SHAPE_SIZE = 50;

let prev_rows = ROWS;
let prev_cols = COLS;
// let prevShapeSize = SHAPE_SIZE;

// UI DOM ELEMENTS
let primaryColorPicker;
let secondaryColorPicker;
let backgroundColorPicker;

let rowSlider;
let columnSlider;
// let shapeSizeSlider; // taken out due to difficulties constraining to window

let saveButton;

// THEMES
let dynamicTheme = [];
// let refreshing;
// let popping;
// let blazing;
let PALETTE = [];

// LAYOUT
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
  // parent UI element
  const ui = createDiv().class("control-panel");

  // labels
  const primaryLabel = createDiv("PRIMARY COLOR").class("label").parent(ui);
  const secondaryLabel = createDiv("SECONDARY COLOR").class("label").parent(ui);
  const backgroundLabel = createDiv("BACKGROUND COLOR")
    .class("label")
    .parent(ui);

  const rowLabel = createDiv("ROWS").class("label").parent(ui);
  const colLabel = createDiv("COLUMNS").class("label").parent(ui);

  // color pickers
  primaryColorPicker = createColorPicker(color(245, 85, 25))
    .class("color-picker")
    .parent(primaryLabel);
  secondaryColorPicker = createColorPicker(color(160, 55, 75))
    .class("color-picker")
    .parent(secondaryLabel);
  backgroundColorPicker = createColorPicker(color(125, 25, 100))
    .class("color-picker")
    .parent(backgroundLabel);

  // sliders
  rowSlider = createSlider(2, maxRows, 10, 1).class("slider").parent(rowLabel);
  colSlider = createSlider(2, maxCols, 10, 1).class("slider").parent(colLabel);
  // shapeSizeSlider = createSlider(10, 30, 10, 1).class("slider").parent(ui);

  saveButton = createButton("SAVE SVG").parent(ui);
  saveButton.mousePressed(saveSVG);

  // LAYOUT
  createCanvas(totalX, totalY, SVG);

  // MODES
  rectMode(CENTER);
  angleMode(DEGREES);

  // COLOR
  // may be used to show preset themes...
  // refreshing = [
  //   color(245, 85, 25), // dark blue
  //   color(160, 55, 75), // green
  //   color(125, 25, 100), // light green
  // ];

  // popping = [
  //   color(275, 85, 30), // purple
  //   color(312, 30, 80), // pink
  //   color(288, 10, 100), // lavender
  // ];

  // blazing = [
  //   color(25, 85, 70), // orange
  //   color(58, 85, 70), // yellow
  //   color(65, 30, 85), // light yellow
  // ];

  calculatePalette();

  // SHAPES
  generateShapes();
}

function draw() {
  // LAYOUT
  calculateLayout();

  // COLOR
  calculatePalette();

  background(PALETTE[2]);
  noFill();
  noStroke();

  // SHAPE GRID
  renderShapes();

  // BORDER
  push();
  noFill();
  stroke(PALETTE[0]);
  translate(width / 2, height / 2);
  rect(0, 0, totalX - MARGIN, totalY - MARGIN);
  pop();

  // console.log(frameRate());

  // uncomment to stop interactivity
  // noLoop();
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

function renderShapes() {
  shapes.forEach((shape) => {
    push();
    translate(shape.x, shape.y);
    shape.update();
    shape.render();
    pop();
  });
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

  resizeCanvas(totalX, totalY);
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
