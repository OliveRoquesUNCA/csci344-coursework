let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  draw5RedSquares();
  draw5CirclesWhile();
  draw5CirclesFor();
  drawNCircles(9);
  drawNCirclesFlexible(17, 25, 500, 100);
  drawNShapesFlexible(6, 50, 600, 100, "square");
  drawNShapesDirectionFlexible(6, 50, 700, 100, "square", "row");
  drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
  noFill();
  // fill('red');
  circle(100, 200, 50); // centerX, centerY, radius
  circle(100, 250, 50);
  circle(100, 300, 50);
  circle(100, 350, 50);
  circle(100, 400, 50);
}

function draw5CirclesWhile() {
  let centerX = 200;
  let centerY = 200;
  let radius = 50;

  while (centerY <= 400) {
    circle(centerX, centerY, radius);
    centerY += radius;
  }
}

function draw5CirclesFor() {
  let centerX = 300;
  let centerY = 200;
  let radius = 50;

  for (let i = 0; i < 5; i++) {
    circle(centerX, centerY, radius);
    centerY += radius;
  }
}

function drawNCircles(n) {
  let centerX = 400;
  let centerY = 200;
  let radius = 50;
  for (let i = 0; i < n; i++) {
    circle(centerX, centerY, radius);
    centerY += radius;
  }
}

function drawNCirclesFlexible(n, size, x, y) {
  let centerY = y;
  for (let i = 0; i < n; i++) {
    circle(x, centerY, size);
    centerY += size;
  }
}
// shapes: circle or square
function drawNShapesFlexible(n, size, x, y, shape) {
  if (shape === "circle") {
    let centerY = y;
    for (let i = 0; i < n; i++) {
      circle(x, centerY, size);
      centerY += size;
    }
  } else if (shape === "square") {
    let topLeftY = y;
    for (let i = 0; i < n; i++) {
      square(x, topLeftY, size);
      topLeftY += size;
    }
  } else {
    console.log("error: invalid shape entered (circle or square allowed)");
    return;
  }
}
//shapes: circles or squares
//direction: column or row
function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
  //if column: use existing flexible function
  if (direction === "column") {
    drawNShapesFlexible(n, size, x, y, shape);
  }

  //if row: modify x rather than y
  else if (direction === "row") {
    if (shape === "circle") {
      let centerX = x;
      for (let i = 0; i < n; i++) {
        circle(centerX, y, size);
        centerX += size;
      }
    } else if (shape === "square") {
      let topLeftX = x;
      for (let i = 0; i < n; i++) {
        square(topLeftX, y, size);
        topLeftX += size;
      }
    }
  }
  //invalid direction entered
  else {
    console.log("Error: invalid direction (row or column allowed)");
    return;
  }
}

//get inclusive random integer between min and max using js Math library
function getRandomIntInclusive(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}
//WIP random function
/*
function randomShapePlacement() {
  //get inclusive random number of shapes to place between 1 and 15
  let n = getRandomIntInclusive(1, 15);
  console.log("creating " + n + " random shapes");
  for (let i = 0; i < n; i++) {
    //randomly decide type of each shape: 0 for circle, 1 for square
    let shapeInt = getRandomIntInclusive(0, 1);
    if (shapeInt == 0) {

    }
  }
}
*/
function draw5RedSquares() {
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
