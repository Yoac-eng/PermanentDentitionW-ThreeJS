import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x555);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Setting up the scene
const scene = new THREE.Scene();

// Setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

// Setting up orbit controls to manipulate the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

//Adding some geometry to make sure the scene is working properly
const groundGeometry = new THREE.PlaneGeometry(15, 15, 22, 22);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

const spotLight = new THREE.SpotLight( 0xffffff, 10, 30, 0.2, 1, 0.1);
spotLight.position.set( 0, 15, 15);
scene.add(spotLight);


// Helper to display a cone shaped helpr object for a spotlight
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

const loader = new GLTFLoader().setPath('test/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);
})

// Function to render the scene 
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // spotLightHelper.update()
  renderer.render(scene, camera);
}

animate();

