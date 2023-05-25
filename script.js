const canvas = document.getElementById("game-area");
const context = canvas.getContext("2d");

// Set the canvas size to 400x400
canvas.width = 400;
canvas.height = 400;

const gravity = 0.01;
const sideEngineThrust = 0.01;
const mainEngineThrust = 0.03;

const ship = {
  color: "black",
  width: 8,
  height: 22,
  position: {
    x: 200,
    y: 200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  mainEngine: false,
  leftEngine: false,
  rightEngine: false,
  crashed: false,
};

function drawTriangle(a, b, c, fill) {
  context.beginPath();
  context.moveTo(a[0], a[1]);
  context.lineTo(b[0], b[1]);
  context.lineTo(c[0], c[1]);
  context.lineTo(a[0], a[1]);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
}

function drawSpaceship() {
  context.save();
  context.beginPath();
  context.translate(ship.position.x, ship.position.y);
  // context.rotate(ship.angle);
  context.rect(
    ship.width * -0.5,
    ship.height * -0.5,
    ship.width,
    ship.height
  );
  context.fillStyle = ship.color;
  context.fill();
  context.closePath();

  // Draw the flame if engine is on
  if (ship.mainEngine) {
    drawTriangle(
      [ship.width * -0.5, ship.height * 0.5],
      [ship.width * 0.5, ship.height * 0.5],
      [0, ship.height * 0.5 + Math.random() * 10],
      'orange'
    )
  }
  if (ship.rightEngine) {
    drawTriangle(
      [ship.width * 0.5, ship.height * -0.25],
      [ship.width * 0.5 + (Math.random() * 10), 0],
      [ship.width * 0.5, ship.height * 0.25],
      'orange'
    )
  }
  if (ship.leftEngine) {
    drawTriangle(
      [ship.width * -0.5, ship.height * -0.25],
      [ship.width * -0.5 - (Math.random() * 10), 0],
      [ship.width * -0.5, ship.height * 0.25],
      'orange'
    )
  }
  context.restore();
}

function updateSpaceship() {

  // what forces acting on the ship?
  if (ship.rightEngine) {
    ship.velocity.x -= sideEngineThrust;
  }
  if (ship.leftEngine) {
    ship.velocity.x += sideEngineThrust;
  }
  if (ship.mainEngine) {
    ship.velocity.y -= mainEngineThrust;
  }

  // gravity is always acting on the ship
  ship.velocity.y += gravity

  // after calculating velocity, update our position
  ship.position.x += ship.velocity.x;
  ship.position.y += ship.velocity.y;

  // mirror ship
  // if (ship.position.x < 0)
  //   ship.position.x += canvas.width
  // if (ship.position.x >= canvas.width)
  //   ship.position.x -= canvas.width
  // if (ship.position.y < 0)
  //   ship.position.y += canvas.height
  // if (ship.position.y >= canvas.height)
  //   ship.position.y -= canvas.height
}

function draw() {
  // Clear entire screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  updateSpaceship();

  // Begin drawing
  drawSpaceship();
  /* other draw methods (to add later) */

  requestAnimationFrame(draw);
}

function keyLetGo(event) {
  // console.log(ship);
  switch (event.keyCode) {
    case 37:
      // Left Arrow key
      ship.leftEngine = false;
      break;
    case 39:
      // Right Arrow key
      ship.rightEngine = false;
      break;
    case 40:
      // Down Arrow key
      ship.mainEngine = false;
      break;
    default:
      return
  }
  event.preventDefault()
}

document.addEventListener("keyup", keyLetGo);

function keyPressed(event) {
  // console.log(ship);
  switch (event.keyCode) {
    case 37:
      // Left Arrow key
      ship.leftEngine = true;
      break;
    case 39:
      // Right Arrow key
      ship.rightEngine = true;
      break;
    case 40:
      // Down Arrow key
      ship.mainEngine = true;
      break;
    default:
      return
  }
  event.preventDefault()
}

document.addEventListener("keydown", keyPressed);

draw();
