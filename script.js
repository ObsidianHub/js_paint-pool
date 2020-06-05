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
}
