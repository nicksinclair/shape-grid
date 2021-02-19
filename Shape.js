class Shape {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.shape = floor(random(3));
    this.paletteIndex = floor(random(0, PALETTE.length - 1));
    this.color = PALETTE[this.paletteIndex];
    this.fill = randomSelectTwo();
    this.transform = floor(random(4));
    this.shapeSize = SHAPE_SIZE;
  }

  render() {
    if (this.fill) {
      fill(this.color);
    } else {
      stroke(this.color);
    }

    renderShape(this.shape, this.shapeSize, this.transform);
  }

  update() {
    this.shapeSize = SHAPE_SIZE;
    this.color = PALETTE[this.paletteIndex];
  }
}
