import "./style.css";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const wheels: THREE.Mesh[] = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;
camera.position.x = 50;
camera.position.y = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight("#000957", 12);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableZoom = true;

const gltfLoader = new GLTFLoader();

gltfLoader.load("/assets/ground/scene.gltf", (object) => {
  const floor = object.scene;
  floor.scale.set(0.2, 0.2, 0.2);
  scene.add(floor);
});

gltfLoader.load("/assets/policeCar/scene.gltf", (object) => {
  const car = object.scene;
  car.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name.includes("Wheel")) {
      wheels.push(child);
    }
  });
  car.position.y = 17;
  car.position.z = 0;
  car.scale.set(10, 10, 10);
  scene.add(car);
  const spotLight = new THREE.SpotLight(0xffffff, 1123);
  spotLight.position.set(10, 20, 19);
  spotLight.angle = Math.PI / 1;
  spotLight.penumbra = 0.1;
  spotLight.castShadow = true;
  spotLight.target = car;
  scene.add(spotLight);
});

gltfLoader.load("/assets/zisSport/scene.gltf", (object) => {
  const sportCar = object.scene;
  sportCar.scale.set(10, 10, 10);
  sportCar.position.y = 574;
  sportCar.position.x = 60;

  scene.add(sportCar);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
