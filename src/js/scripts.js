import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const sateliteUrl = new URL('../assets/satelite.glb', import.meta.url);
const assetLoader = new GLTFLoader();

const sateliteAxis = {
    X: 10,
    Y: -10,
    Z: 0
};
const sateliteRotation = {
    X: 0,
    Y: 0,
    Z: 0
};

let model;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(sateliteAxis.X, sateliteAxis.Y, sateliteAxis.Z);
orbit.update();

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30, 100);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFF00,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

assetLoader.load(sateliteUrl.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(sateliteAxis.X, sateliteAxis.Y, sateliteAxis.Z);
}, undefined, function(error) {
    console.log(error);
});

const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    X: sateliteAxis.X,
    Y: sateliteAxis.Y,
    Z: sateliteAxis.Z
};

gui.addColor(options, 'sphereColor').onChange(e => sphere.material.color.set(e));
gui.add(options, 'wireframe').onChange(e => sphere.material.wireframe = e);

gui.add(options, 'X', -50, 50).onChange(e => {
    sateliteAxis.X = e;
    if (model) model.position.x = e;
});
gui.add(options, 'Y', -50, 50).onChange(e => {
    sateliteAxis.Y = e;
    if (model) model.position.y = e;
});
gui.add(options, 'Z', -50, 50).onChange(e => {
    sateliteAxis.Z = e;
    if (model) model.position.z = e;
});

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
