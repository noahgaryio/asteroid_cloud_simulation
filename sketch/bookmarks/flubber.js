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

  // Draw the cloud of points forming the ellipse shape
  for (let i = 0; i < cloudSize; i++) {
    let radius = randomGaussian(cloudSize / 4, cloudSize / 8);
    let angle = random(TWO_PI);
    let x = xPos + cos(angle) * radius;
    let y = yPos + sin(angle) * radius;
    let pointSize = map(i, 0, cloudSize - 1, 40, 5); // Gradually decrease size of cloud points
    ellipse(x, y, pointSize, pointSize);
    cloud[i] = { x: x, y: y };
  }

  // Draw the trail and add current cloud points to the trail array
  for (let i = 0; i < cloud.length; i++) {
    let trailAlpha = map(i, 0, cloud.length - 1, 100, 0); // Gradually decrease transparency
    fill(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], trailAlpha);
    let trailSize = map(i, 0, cloud.length - 1, 5, 40); // Gradually decrease size of trail points
    ellipse(cloud[i].x, cloud[i].y, trailSize, trailSize);
    trail.push({ x: cloud[i].x, y: cloud[i].y });
  }

  // Limit the length of the trail
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  // Limit the length of the cloud
  if (cloud.length > cloudSize) {
    cloud.shift();
  }
}
