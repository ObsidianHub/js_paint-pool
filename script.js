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

var pool = new Array();
var particles = new Array();

var context = document
  .getElementById("canvas")
  .getContext("2d", { alpha: false });
var output = document.getElementById("p");

var pointer = { x: 0, y: 0, down: false };
var color = new Color(0, 0, 0);
var direction = 0;

function loop(time_stamp) {
  window.requestAnimationFrame(loop);

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  direction += 0.01;
  color.gradualShift(direction);

  output.style.color = "rgb(" + color.getRGBString() + ")";
  document.body.style.backgroundColor = output.style.color;

  if (pointer.down) {
    for (let index = 0; index < 2; ++index) {
      let particle = pool.pop();

      if (particle != undefined) {
        particle.reset(pointer.x, pointer.y, color.getRGBString());
        particles.push(particle);
      } else {
        particles.push(
          new Particle(
            pointer.x,
            pointer.y,
            Math.floor(Math.random() * 10 + 10),
            color.getRGBString()
          )
        );
      }
    }
  }
}
