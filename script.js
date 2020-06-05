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

  for (let index = particles.length - 1; index > -1; --index) {
    let particle = particles[index];

    particle.updatePosition();

    if (particle.a <= 0) pool.push(particles.splice(index, 1)[0]);

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = particle.color;
    context.fill();
    context.closePath();
  }

  output.innerHTML = "pool: " + pool.length + "<br>live: " + particles.length;
}

function resize(event) {
  context.canvas.height = document.documentElement.clientHeight - 16;
  context.canvas.width = document.documentElement.clientWidth - 16;
}

function mouseDownMoveUp(event) {
  event.preventDefault();

  var rect = context.canvas.getBoundingClientRect();

  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;

  switch (event.type) {
    case "mousedown":
      pointer.down = true;
      break;
    case "mouseup":
      pointer.down = false;
  }
}

function touchEndMoveStart(event) {
  event.preventDefault();

  var rect = context.canvas.getBoundingClientRect();
  var touch = event.targetTouches[0];

  if (touch) {
    pointer.x = touch.clientX - rect.left;
    pointer.y = touch.clientY - rect.top;
  }

  switch (event.type) {
    case "touchstart":
      pointer.down = true;
      break;
    case "touchend":
      pointer.down = false;
  }
}

window.addEventListener("resize", resize);

window.addEventListener("mousedown", mouseDownMoveUp);
window.addEventListener("mousemove", mouseDownMoveUp);
window.addEventListener("mouseup", mouseDownMoveUp);
