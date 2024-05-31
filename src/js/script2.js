/* Imports */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
/* Loader */
const assetLoader = new GLTFLoader();

/* 3D Object */
let model;
const sateliteUrl = new URL('../assets/satelite.glb', import.meta.url);
const satelitePosition = {
    X : 0,
    Y : 1,
    Z : 0
}
const sateliteRotation = {
    X : 0,
    Y : 0,
    Z : 0
}

/* Scene and Camera */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(10, 10, 10);

/* Render - DOM include */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth*0.55,window.innerHeight*0.65);
document.querySelector('.model3d').appendChild(renderer.domElement);


/* Helpers */
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
const axesHelper = new THREE.AxesHelper(10);

/* GUI */
const gui = new dat.GUI();
const options = {
    positionX: satelitePosition.X,
    positionY: satelitePosition.Y,
    positionZ: satelitePosition.Z,
    rotateX: sateliteRotation.X,
    rotateY: sateliteRotation.Y,
    rotateZ: sateliteRotation.Z
}

/* GUI add */
gui.add(options, 'positionX', -50, 50).onChange(e => {
    satelitePosition.X = e;
    if (model) model.position.x = e;
});
gui.add(options, 'positionY', -50, 50).onChange(e => {
    satelitePosition.Y = e;
    if (model) model.position.y = e;
});
gui.add(options, 'positionZ', -50, 50).onChange(e => {
    satelitePosition.Z = e;
    if (model) model.position.z = e;
});
gui.add(options, 'rotateX', 0, Math.PI * 2).onChange(e => {
    sateliteRotation.X = e;
});
gui.add(options, 'rotateY', 0, Math.PI * 2).onChange(e => {
    sateliteRotation.Y = e;
});
gui.add(options, 'rotateZ', 0, Math.PI * 2).onChange(e => {
    sateliteRotation.Z = e;
});

/* Light */
const ambientLight = new THREE.AmbientLight(0xFFFFFF);

/* Adding in Scene */
scene.add(axesHelper);
scene.add(ambientLight);

/* Adding 3D Model */
assetLoader.load(sateliteUrl.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(satelitePosition.X, satelitePosition.Y, satelitePosition.Z);
}, undefined, function(error) {
    console.log(error);
});

/* Grid Helpers */
const size = 100;
const divisions = 30;

// Ground
const gridHelperGround = new THREE.GridHelper(size, divisions);
scene.add(gridHelperGround);


function animate() {
    if (model) {
        model.rotation.x = sateliteRotation.X;
        model.rotation.y = sateliteRotation.Y;
        model.rotation.z = sateliteRotation.Z;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
});