let cloud = [];
let trail = [];
let cols;
let rows;
let resolution = 400;
let startColor;
let endColor;
let currentColor;
let steps = 100;
let xOff = 0.0;
let yOff = 0.0;
let xSpeed, ySpeed;
let maxTrailLength = 50;
let cloudSize = 100;

function setup() {
  createCanvas(1300, 1000);
  cols = width / resolution;
  rows = height / resolution;
  startColor = color(255, 0, 0);
  endColor = color(0, 255, 0);
  currentColor = color(startColor);
  frameRate(60);
}

function draw() {
  background(0);
  noStroke();
  colorMode(RGB, 100);

  xOff += 0.01;
  yOff += 0.01;
  xSpeed = map(noise(xOff), 0, 1, -2, 2);
  ySpeed = map(noise(yOff), 0, 1, -2, 2);

  let xPos = (width / 2) + (xSpeed * 100); // Add movement to cloud's x position
  let yPos = (height / 2) + (ySpeed * 100); // Add movement to cloud's y position

  xPos = (xPos + width) % width;
  yPos = (yPos + height) % height;

  currentColor = lerpColor(startColor, endColor, (frameCount % steps) / steps);

  fill(currentColor);

  // Draw a cloud of points forming the ellipse shape
  cloud = [];
  for (let i = 0; i < cloudSize; i++) {
    let radius = randomGaussian(cloudSize / 4, cloudSize / 8);
    let angle = random(TWO_PI);
    let x = xPos + cos(angle) * radius;
    let y = yPos + sin(angle) * radius;
    ellipse(x, y, 5, 5); // Adjust the size of the points
    cloud.push({ x: x, y: y });
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    let trailPos = trail[i];
    let trailAlpha = map(i, 0, trail.length, 100, 0); // Gradually decrease transparency
    fill(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], trailAlpha);
    let trailSize = map(i, 0, trail.length, 5, 40); // Gradually decrease size of trail points
    ellipse(trailPos.x, trailPos.y, trailSize, trailSize);
  }

  // Add the current position to the trail array
  trail.push({ x: xPos, y: yPos });

  // Limit the length of the trail
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  // Limit the length of the cloud
  if (cloud.length > cloudSize) {
    cloud.shift();
  }

  // Draw a preview of the cloud at a fixed position
  drawCloudPreview(100, 100, cloudSize);
}

function drawCloudPreview(x, y, size) {
  fill(currentColor);
  for (let i = 0; i < cloudSize; i++) {
    let radius = randomGaussian(size / 4, size / 8);
    let angle = random(TWO_PI);
    let xPos = x + cos(angle) * radius;
    let yPos = y + sin(angle) * radius;
    ellipse(xPos, yPos, 5, 5); // Adjust the size of the points
  }
}
