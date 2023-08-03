// Read the JSON config file
let config;

function preload() {
  config = loadJSON("config.json");
}

let cloud = [];
let averagePos; // Average position of the cloud
let cloudPos; // Initial position of the cloud
let lastAsteroidTime = 0; // Keep track of the last time an asteroid was added
let cloudCenter; // Center position of the cloud
let xOff = 0.0;
let yOff = 0.0;
let xSpeed, ySpeed;
let planetRadius; // Add a variable for the planet size

let startColor, endColor; // Define startColor and endColor variables

function setup() {
  createCanvas(1300, 1000);
  cols = width / config.resolution;
  rows = height / config.resolution;
  startColor = color(config.startColor.r, config.startColor.g, config.startColor.b);
  endColor = color(config.endColor.r, config.endColor.g, config.endColor.b);
  frameRate(60);
  cloudPos = createVector(width / 2, height / 2); // Center the cloud on the canvas
  cloudCenter = createVector(width / 2, height / 2); // Center position of the cloud
  averagePos = createVector(0, 0); // Initialize averagePos with a vector at (0, 0)

  planetRadius = 100; // Set the initial planet size
  generatePlanet(cloudCenter, planetRadius); // Generate the planet and craters
}

function draw() {
  background(0);
  noStroke();
  colorMode(RGB, 100);

  moveCloud();
  updateAsteroids();
  addNewAsteroid();
  displayCloudName();

  // Increment the planet's rotation angle by the rotation speed
  planetRotation += -0.002;

  // Display the planet and craters with the updated rotation angle
  displayPlanetAndCraters(cloudCenter, planetRadius, planetRotation);
  drawCraters(cloudCenter);
}

function moveCloud() {
  // Calculate the average position of all the asteroids in the cloud
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < cloud.length; i++) {
    sumX += cloud[i].x;
    sumY += cloud[i].y;
  }
  averagePos.x = sumX / cloud.length;
  averagePos.y = sumY / cloud.length;

  // Update cloud position using Perlin noise
  xOff += config.xOffIncrement;
  yOff += config.yOffIncrement;
  xSpeed = map(noise(xOff), 0, 1, -config.maxSpeed, config.maxSpeed);
  ySpeed = map(noise(yOff), 0, 1, -config.maxSpeed, config.maxSpeed);

  cloudPos.x = (cloudPos.x + xSpeed * width + width) % width;
  cloudPos.x *= config.damping;

  cloudPos.y = (cloudPos.y + ySpeed * height + height) % height;
  cloudPos.y *= config.damping;
}

/**
 * Display the name of the cloud above the cloud's center.
 */
function displayCloudName() {
  // Display the planet-like dot at the cloud's center
  let darkerPlanetColor = color(red(planetColor) - 30, green(planetColor) - 30, blue(planetColor) - 30);
  fill(planetColor);
  ellipse(cloudCenter.x, cloudCenter.y, 40, 40); // Adjust the size of the "planet-like" dot

  // Add random craters to the planet
  for (let i = 0; i < 5; i++) {
    let craterSize = random(5, 15);
    let minDistance = 10 + craterSize / 2; // Minimum distance from the center of the planet-like dot
    let maxDistance = 18 - craterSize / 2; // Maximum distance from the center of the planet-like dot
    let distance = random(minDistance, maxDistance);
    let angle = random(TWO_PI);
    let x = cloudCenter.x + cos(angle) * distance;
    let y = cloudCenter.y + sin(angle) * distance;

    fill(darkerPlanetColor);
    ellipseMode(CENTER); // Set ellipse mode to CENTER
    ellipse(x, y, craterSize, craterSize);
  }

  // Display the cloud name at the cloud's center
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(config.cloudName, cloudPos.x, cloudPos.y - 50); // Display the name above the cloud
}

/**
 * Apply orbit force between points to make them orbit around the cloud center.
 * @param {Array} points - The array of points in the cloud.
 * @param {number} index - The index of the current point being updated.
 * @param {number} cloudX - The x-coordinate of the cloud's center.
 * @param {number} cloudY - The y-coordinate of the cloud's center.
 */
function applyOrbit(points, index, cloudX, cloudY) {
  let force = p5.Vector.sub(createVector(cloudX, cloudY), createVector(points[index].x, points[index].y));
  points[index].vx += force.y * config.attractionStrength;
  points[index].vy += -force.x * config.attractionStrength;

  // Apply damping to slow down the velocity of the point over time
  points[index].vx *= config.damping;
  points[index].vy *= config.damping;
}

/**
 * Apply repulsion force between points to avoid stacking.
 * @param {Array} points - The array of points in the cloud.
 * @param {number} index - The index of the current point being updated.
 */
function applyRepulsion(points, index) {
  for (let i = 0; i < points.length; i++) {
    if (i !== index) {
      let distance = dist(points[index].x, points[index].y, points[i].x, points[i].y);
      if (distance < config.pointSize) {
        let force = p5.Vector.sub(createVector(points[index].x, points[index].y), createVector(points[i].x, points[i].y));
        let repulsionForce = force.mult(config.repulsionStrength);
        points[index].vx += repulsionForce.x;
        points[index].vy += repulsionForce.y;
      }
    }
  }
}
