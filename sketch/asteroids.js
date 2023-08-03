let asteroidColors = [200, 220, 230, 240, 250];
let asteroidsAdded = 0;

function updateAsteroids() {
  let asteroidColor = random(asteroidColors);
  fill(asteroidColor);

  for (let i = 0; i < cloud.length; i++) {
    let asteroid = cloud[i];
    applyOrbit(cloud, i, cloudCenter.x, cloudCenter.y);
    applyRepulsion(cloud, i);
    asteroid.x += asteroid.vx;
    asteroid.y += asteroid.vy;
    ellipse(asteroid.x, asteroid.y, config.pointSize, config.pointSize);
  }
}

function addNewAsteroid() {
  if (asteroidsAdded < config.cloudSize) {
    let maxAsteroidDistance = planetRadius + config.pointSize / 2;
    let radius = randomGaussian(maxAsteroidDistance * 4, maxAsteroidDistance / 8);
    let angle = random(TWO_PI);
    let x = cloudCenter.x + cos(angle) * radius;
    let y = cloudCenter.y + sin(angle) * radius;

    let direction = createVector(x - cloudCenter.x, y - cloudCenter.y);
    let initialRotation = random(-PI / 4, PI / 4);
    direction.rotate(initialRotation).normalize();

    let initialSpeed = random(10, 30);
    let initialVelocity = direction.mult(initialSpeed);

    cloud.push({ x: x, y: y, vx: initialVelocity.x, vy: initialVelocity.y });
    asteroidsAdded++;
  }
}
