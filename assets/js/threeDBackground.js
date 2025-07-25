// --- 3D Hero Background ---
let scene, camera, renderer, particles;
const container = document.getElementById('three-canvas');

function init3D() {
    if (!container || typeof THREE === 'undefined') {
        console.warn('Three.js container not found or Three.js not loaded.');
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let particleCount = window.innerWidth < 768 ? 2000 : 5000; // Fewer particles on mobile
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.015,
        transparent: true
    });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Initial resize call to set up correctly
    onWindowResize();
}

function onWindowResize() {
    if (!renderer || !camera) return;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
    }
}

let mouseX = 0, mouseY = 0;
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function animate3D() {
    if (!particles || !renderer || !camera || !scene) return;
    requestAnimationFrame(animate3D);
    particles.rotation.x += 0.0002 + (mouseY * 0.00005);
    particles.rotation.y += 0.0002 + (mouseX * 0.00005);
    renderer.render(scene, camera);
}

// Ensure Three.js initialization happens after DOM is fully loaded and Three.js script is ready
document.addEventListener('DOMContentLoaded', init3D);
document.addEventListener('DOMContentLoaded', animate3D);