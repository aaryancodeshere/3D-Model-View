
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 130); 

let mouseX = 0;
let mouseY = 0;

let object;

const loader = new GLTFLoader();

loader.load(
  `models/shirt/scene.gltf`,  
  function (gltf) {
    object = gltf.scene;

    object.scale.set(150, 150, 150); 
    object.position.set(0, 100, 0); 

    object.rotation.y = 0; 

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    object.position.x -= center.x;
    object.position.y -= center.y;
    object.position.z -= center.z;

    scene.add(object);

    console.log('Bounding Box:', box);
  },
  function (xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {

    console.error(error);
  }
);


const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(10, 10, 10); 
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2); 
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  
  if (object) {

    object.rotation.y = mouseX * Math.PI; 
    object.rotation.x = mouseY * Math.PI * 0.5; 
  }

  renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1; 
  mouseY = (e.clientY / window.innerHeight) * 2 - 1; 
};

animate();
