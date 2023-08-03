// planet.js

// Variables for the planet-like dot
let planetColor;
let craterColor;
let craters = [];
let maxCraters = 10; // Adjust the number according to your preference
let planetRotation = 0; // Initialize the rotation angle
let planetRotationSpeed = 0.01; // Adjust the rotation speed here

function generatePlanet(cloudCenter) {
  // Function to generate the "planet-like" dot and craters
  planetColor = color(random(255), random(255), random(255)); // Generate a random color for the planet
  craterColor = color(red(planetColor) - 30, green(planetColor) - 30, blue(planetColor) - 30);

  // Generate static craters around the cloud center
  for (let i = 0; i < 5; i++) {
    let craterSize = random(5, 15);
    let minDistance = 10 + craterSize / 2;
    let maxDistance = planetRadius - craterSize / 2;
    let distance = random(minDistance, maxDistance);
    let angle = random(TWO_PI);
    let x = cloudCenter.x + cos(angle) * distance;
    let y = cloudCenter.y + sin(angle) * distance;
    craters.push({ x: x, y: y, size: craterSize });
  }
}

function displayPlanetAndCraters(cloudCenter, planetRadius) {
    push(); // Save the current drawing settings
    translate(cloudCenter.x, cloudCenter.y); // Translate to the cloud center
    rotate(planetRotation); // Apply the rotation angle
    fill(planetColor);
    ellipse(0, 0, planetRadius * 2, planetRadius * 2); // Adjust the size of the "planet-like" dot

    // Display the static craters
    fill(craterColor);
    for (let i = 0; i < craters.length; i++) {
        ellipse(craters[i].x - cloudCenter.x, craters[i].y - cloudCenter.y, craters[i].size, craters[i].size); // Adjust the position for rotation
    }

    pop(); // Restore the original drawing settings
}

function isCraterIntersectingPlanet(planetX, planetY, planetRadius, craterX, craterY, craterRadius) {
  let distance = dist(planetX, planetY, craterX, craterY);
  return distance + craterRadius > planetRadius;
}

function drawCraters(cloudCenter) {
    let darkerPlanetColor = color(red(planetColor) - 30, green(planetColor) - 30, blue(planetColor) - 30);
    for (let i = 0; i < craters.length; i++) {
        let crater = craters[i];
        if (!isCraterIntersectingPlanet(cloudCenter.x, cloudCenter.y, 40, crater.x, crater.y, crater.size)) {
            fill(darkerPlanetColor);
            ellipse(crater.x, crater.y, crater.size, crater.size);
        }
    }
}
