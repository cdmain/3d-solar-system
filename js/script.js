// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Background of the galaxy
const loader = new THREE.TextureLoader();
const starsTexture = loader.load('https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/stars.jpg');
scene.background = starsTexture;

// Create celestial bodies           
const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: loader.load('https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/sun.jpg') });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const mercury = createPlanet(2, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/mercury.jpg', "mercury");
const venus = createPlanet(3.8, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/venus.jpg', "venus");
const earth = createPlanet(4, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/earth.jpg', "earth");
const mars = createPlanet(2, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/mars.jpg', "mars");
const jupiter = createPlanet(12, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/jupiter.jpg', "jupiter");
const saturn = createPlanet(10, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/saturn.jpg', "saturn", true); // Saturn has a ring
const uranus = createPlanet(7, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/uranus.jpg', "uranus");
const neptune = createPlanet(6.5, 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/neptune.jpg', "neptune");

// Set initial positions (orbital radii from the Sun)
const orbits = [
  { planet: mercury, radius: 20, speed: 0.04 },
  { planet: venus, radius: 30, speed: 0.02 },
  { planet: earth, radius: 40, speed: 0.01 },
  { planet: mars, radius: 50, speed: 0.008 },
  { planet: jupiter, radius: 65, speed: 0.005 },
  { planet: saturn, radius: 95, speed: 0.003 },
  { planet: uranus, radius: 120, speed: 0.002 },
  { planet: neptune, radius: 140, speed: 0.001 },
];

// Add orbit lines
orbits.forEach((orbit) => {
  const orbitGeometry = new THREE.RingGeometry(orbit.radius - 0.05, orbit.radius + 0.05, 64);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: 0.3, transparent: true });
  const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbitMesh.rotation.x = Math.PI / 2; // Rotate to lie flat
  scene.add(orbitMesh);
});

// Add a light source (simulating sunlight)
const light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 0);
scene.add(light);

// Sky color, ground color, intensity
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.5); 
scene.add(hemisphereLight);

// Position the camera
camera.position.z = 180;
camera.position.y = 30;

// Variables for UI control
let orbitSpeedFactor = 0.01;
let rotationSpeedFactor = 0.01;
let focusedPlanet = null;

// UI Elements
const orbitSpeedInput = document.getElementById('orbitSpeed');
const rotationSpeedInput = document.getElementById('rotationSpeed');
const focusPlanetSelect = document.getElementById('focusPlanet');

// Update UI controls
orbitSpeedInput.addEventListener('input', function() {
  orbitSpeedFactor = parseFloat(this.value);
});

rotationSpeedInput.addEventListener('input', function() {
  rotationSpeedFactor = parseFloat(this.value);
});

focusPlanetSelect.addEventListener('change', function() {
  const selectedPlanetName = this.value;
  focusedPlanet = selectedPlanetName !== 'none' ? scene.getObjectByName(selectedPlanetName) : null;
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Update the position of each planet to orbit around the Sun
  orbits.forEach((orbit) => {
    const angle = Date.now() * orbit.speed * orbitSpeedFactor;
    orbit.planet.position.x = orbit.radius * Math.cos(angle);
    orbit.planet.position.z = orbit.radius * Math.sin(angle);
  });

  // Rotate planets
  orbits.forEach((orbit) => {
    orbit.planet.rotation.y += rotationSpeedFactor;
  });

  // Update the camera to follow the focused planet on the same orbit
  if (focusedPlanet) {
    const orbit = orbits.find(o => o.planet === focusedPlanet);
    const angle = Date.now() * orbit.speed * orbitSpeedFactor;
    const offset = 20; // Distance from the planet
    camera.position.x = (orbit.radius + offset) * Math.cos(angle);
    camera.position.z = (orbit.radius + offset) * Math.sin(angle);
    camera.position.y = 10; // Fixed height above the plane of orbit
    camera.lookAt(focusedPlanet.position);
  }

  // Update camera controls
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Helper function to create a planet
function createPlanet(size, textureUrl, name, hasRing = false) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshLambertMaterial({ map: loader.load(textureUrl) });
  const planet = new THREE.Mesh(geometry, material);
  planet.name = name; // Assign a unique name for the planet

  // Add ring for Saturn
  if (hasRing) {
    const ringGeometry = new THREE.RingGeometry(size + 1, size + 5, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: loader.load('https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/saturn_ring.png'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; // Rotate to lie flat
    planet.add(ring);
  }

  scene.add(planet);
  return planet;
}

// Loading Screen
window.onload = function() {
  const loadingScreen = document.querySelector('.loadingScreen');
  loadingScreen.style.backgroundImage = 'https://raw.githubusercontent.com/cdmain/cdmain.github.io/main/img/background.jpg';
  const loadingMessage = "3D Solar System Simulation";
  document.querySelector('.loadingMessage').innerHTML = loadingMessage;
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.remove();
    });
  }, 3000); // Adjust the delay as needed
};
