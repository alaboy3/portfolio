import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.0/build/three.module.js';

const scene = new THREE.Scene();

const aspectRatio = 16 / 9; // Desired aspect ratio

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('mandelbulb-canvas-container').appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 0);

const numPoints = 50000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(numPoints * 3);

const power = 8.0;
const angle = 0.0;

const center = new THREE.Vector3(0, 0, 0);
const maxDistance = 3.0;

for (let i = 0; i < numPoints; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;

    const r = Math.pow(Math.random(), power) * maxDistance * Math.random();

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    positions[i * 3] = x + center.x;
    positions[i * 3 + 1] = y + center.y;
    positions[i * 3 + 2] = z + center.z;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0x291711, size: 0.01 });
const pointCloud = new THREE.Points(geometry, material);
scene.add(pointCloud);

camera.position.z = 2;
camera.position.y = 1;
camera.lookAt(scene.position);

const mandelbulbCanvasContainer = document.getElementById('mandelbulb-canvas-container');
const canvasWidth = window.innerWidth * 0.8;
const canvasHeight = canvasWidth / aspectRatio;
mandelbulbCanvasContainer.style.width = canvasWidth + 'px';
mandelbulbCanvasContainer.style.height = canvasHeight + 'px';


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const newCanvasWidth = window.innerWidth * 0.8;
    const newCanvasHeight = newCanvasWidth / aspectRatio;
    mandelbulbCanvasContainer.style.width = newCanvasWidth + 'px';
    mandelbulbCanvasContainer.style.height = newCanvasHeight + 'px';
});

const animate = () => {
    requestAnimationFrame(animate);
    pointCloud.rotation.x += 0.005;
    pointCloud.rotation.y += 0.005;
    renderer.render(scene, camera);
};

animate();
