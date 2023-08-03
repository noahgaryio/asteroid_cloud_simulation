# Tamatron - Cloud Simulation

This is a p5.js project that simulates a cloud-like structure with points that attract, repel, and orbit each other. The configuration for the cloud and points is specified in the `config.json` file. The cloud is attracted to the center of the canvas, while the points are attracted and repelled by the center of the cloud.

## Configuration

The `config.json` file contains the following properties:

- `resolution`: The resolution of the cloud grid.
- `startColor`: The starting color for the cloud.
- `endColor`: The ending color for the cloud.
- `steps`: The number of steps for the color transition.
- `maxTrailLength`: The maximum length of the trail behind the cloud.
- `cloudSize`: The maximum number of points in the cloud.
- `cloudName`: The name of the cloud displayed on the canvas.
- `dotInterval`: The time interval in seconds for adding new points to the cloud.
- `attractionStrength`: The strength of the attraction force between points and the cloud center.
- `repulsionStrength`: The strength of the repulsion force between points to avoid stacking.
- `damping`: The damping factor to slow down the cloud movement.
- `pointSize`: The static size of the points in the cloud.

## Usage

1. Clone this repository.
2. Modify the `config.json` file to customize the cloud simulation.
3. Open `index.html` in your web browser to view the simulation.

## Licensing

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
