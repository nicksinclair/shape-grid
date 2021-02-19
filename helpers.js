// Finds a point on a circle of a given radius
function pointOnCircle(posX, posY, radius, angle) {
  const x = posX + radius * cos(angle);
  const y = posY + radius * sin(angle);
  return createVector(x, y);
}

// Draws a right triangle
function rightTriangle(posX, posY, length) {
  beginShape();
  const a = createVector(posX + length / 2, posY + length / 2);
  const b = createVector(posX - length / 2, posY + length / 2);
  const c = createVector(posX - length / 2, posY - length / 2);

  vertex(a.x, a.y);
  vertex(b.x, b.y);
  vertex(c.x, c.y);
  vertex(a.x, a.y);
  endShape();
}

// Draws a hexagon
function hexagon(posX, posY, radius) {
  const rotAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
    vertex(thisVertex.x, thisVertex.y);
  }
  endShape(CLOSE);
}

// Randomly selects boolean value
function randomSelectTwo() {
  // Number of Lines
  const rand = random(1);

  if (rand < 0.5) {
    return true;
  } else {
    return false;
  }
}

// Selects a color from PALETTE randomly
function getRandomFromPalette() {
  const rand = floor(random(0, PALETTE.length - 1));
  return PALETTE[rand];
}

// Applies a random rotation
function applyRotation() {
  const angle = floor(random(4));
  rotate(angle * 90);
}

// Handles logic for selecting shape to render
function renderShape(shape, shapeSize, transform) {
  if (shape === 0) {
    rect(0, 0, shapeSize);
  } else if (shape === 1) {
    ellipse(0, 0, shapeSize);
  } else if (shape === 2) {
    rotate(transform * 90);
    rightTriangle(0, 0, shapeSize);
  }
}
