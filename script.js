class Particle {
  constructor(x, y, radius, rgb_string) {
    this.radius = radius;
    this.reset(x, y, rgb_string);
  }

  reset(x, y, rgb_string) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.rgb_string = rgb_string;
    this.a = 1;
  }

  get color() {
    return "rgba(" + this.rgb_string + "," + this.a + ")";
  }

  updatePosition() {
    this.a -= 0.01;

    this.x += this.vx;
    this.y += this.vy;
  }
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getRGBString() {
    return String(this.r + "," + this.g + "," + this.b);
  }

  gradualShift(direction) {
    this.r = Math.floor(Math.abs(Math.cos(direction * 0.75) * 256));
    this.g = Math.floor(Math.abs(Math.sin(direction * 0.25) * 256));
    this.b = Math.floor(Math.abs(Math.sin(direction * 0.5) * 256));
  }
}
