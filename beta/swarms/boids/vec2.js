/*Based on Noah Veltman's code at https://bl.ocks.org/veltman/995d3a677418100ac43877f3ed1cc728*/
/*With the addition of simple matrix class and a rotate functiion for vectors*/

class Vec2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.count = 0;
    return this;
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  scale(s) {
    this.x = this.x * s;
    this.y = this.y * s;
    return this;
  }
  scaleTo(s) {
    var length = this.length();
    this.x = this.x * s / length;
    this.y = this.y * s / length;
    return this;
  }
  normalize() {
    var length = this.length();
    this.x = this.x / length;
    this.y = this.y / length;
    return this;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  truncate(max) {
    var length = this.length();
    if (length > max) {
      this.x = this.x * max / length;
      this.y = this.y * max / length;
    }
    return this;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  rotate(rad) {
    var rotMat = new Mat2(new Vec2(Math.cos(rad), Math.sin(rad)), new Vec2(Math.sin(-rad), Math.cos(rad)));
    return rotMat.mul(new Vec2(this.x, this.y));
  }
}

class Mat2 {
  constructor(vec1, vec2) {
    this.a = vec1.x;
    this.b = vec2.x;
    this.c = vec1.y;
    this.d = vec2.y;
    this.determinant = this.a * this.d - this.b * this.c;
  }
  mul(vec) {
    return new Vec2(this.a * vec.x + this.b * vec.y, this.c * vec.x + this.d * vec.y);
  }
}
