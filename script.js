
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// =====================================
// VELOCITY WEBSITE ANIMATION ENGINE
// =====================================

// LOADING SCREEN

window.addEventListener('load', () => {
    const loader = document.getElementById('velocityLoader');

    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');

            setTimeout(() => {
                loader.remove();
            }, 900);
        }, 500);
    }
});

// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(
    '.discover-heading, .discover-card, .home-statement, ' +
    '.experience-story, .experience-values, ' +
    '.innovation-heading, .innovation-card, ' +
    '.contact-information, .contact-form-container, ' +
    '.premium-car, .gallery-intro, .technology-statement'
);

revealElements.forEach((element, index) => {
    element.classList.add('reveal');

    if (element.classList.contains('discover-card')) {
        element.style.transitionDelay = `${index % 3 * 120}ms`;
    }
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add('visible');
    });
}

// =====================================
// NAVBAR SCROLL EFFECT
// =====================================

const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle('navbar-scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// =====================================
// SMOOTH ANCHOR NAVIGATION
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================
// HOME PAGE FLOATING PARTICLES
// =====================================

const particlesContainer = document.querySelector('.floating-particles');

if (particlesContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 14; i++) {
        const particle = document.createElement('span');

        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${7 + Math.random() * 7}s`;

        fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
}

// =====================================
// CONTACT FORM DEMO
// =====================================

const contactForm = document.getElementById('velocityContactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (formStatus) {
            formStatus.textContent =
                'Thank you! Your message has been prepared successfully.';
            formStatus.style.display = 'block';
        }

        contactForm.reset();
    });
}

// =====================================
// VELOCITY 3D SHOWROOM ENGINE
// =====================================

const container = document.getElementById('car3d-container');
const loading = document.getElementById('car-loading');

if (container) {

    // SCENE

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x10151d);

    // CAMERA

    const camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.1,
        100
    );

    camera.position.set(5, 3, 7);

    // RENDERER

    const renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'low-power'
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.25)
    );

    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // SHOWROOM LIGHTING

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffe6c0, 3);
    mainLight.position.set(4, 8, 5);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x298bff, 35, 15);
    blueLight.position.set(-5, 3, 2);
    scene.add(blueLight);

    const warmLight = new THREE.PointLight(0xffc27a, 30, 15);
    warmLight.position.set(5, 3, -4);
    scene.add(warmLight);

    // SHOWROOM FLOOR

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x252a31,
            metalness: 0.65,
            roughness: 0.25
        })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.03;
    scene.add(floor);

    // BACK WALL

    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 20),
        new THREE.MeshStandardMaterial({
            color: 0x111820,
            metalness: 0.35,
            roughness: 0.65
        })
    );

    wall.position.set(0, 5, -9);
    scene.add(wall);

    // LIGHT STRIPS

    function createLightStrip(x, y, z, length) {
        const strip = new THREE.Mesh(
            new THREE.BoxGeometry(length, 0.025, 0.04),
            new THREE.MeshBasicMaterial({
                color: 0x329bff
            })
        );

        strip.position.set(x, y, z);
        scene.add(strip);
    }

    createLightStrip(0, 5, -8.8, 13);
    createLightStrip(-6, 2.5, -8.8, 3);
    createLightStrip(6, 2.5, -8.8, 3);

    // 3D CAR MODEL

    const gltfLoader = new GLTFLoader();
    let car = null;

    gltfLoader.load(
        './models/velocity-car.glb',

        function (gltf) {
            car = gltf.scene;

            const box = new THREE.Box3().setFromObject(car);
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();

            box.getSize(size);
            box.getCenter(center);

            car.position.sub(center);

            const maxDimension = Math.max(size.x, size.y, size.z);
            const scale = maxDimension > 0 ? 4.5 / maxDimension : 1;

            car.scale.setScalar(scale);

            const newBox = new THREE.Box3().setFromObject(car);
            car.position.y -= newBox.min.y;

            car.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = false;
                    child.receiveShadow = false;

                    if (child.material) {
                        child.material.envMapIntensity = 1.2;
                    }
                }
            });

            scene.add(car);

            if (loading) {
                loading.style.display = 'none';
            }

            console.log('VELOCITY 3D car loaded successfully!');
        },

        function (progress) {
            if (loading && progress.total > 0) {
                const percent = Math.round(
                    progress.loaded / progress.total * 100
                );

                loading.textContent =
                    'LOADING 3D EXPERIENCE... ' + percent + '%';
            }
        },

        function (error) {
            console.error('Car loading failed:', error);

            if (loading) {
                loading.textContent =
                    'CAR MODEL FAILED TO LOAD. CHECK models/velocity-car.glb';
            }
        }
    );

    // CAMERA CONTROLS

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.minPolarAngle = 0.85;
    controls.maxPolarAngle = 1.48;
    controls.target.set(0, 0.7, 0);

    // RESPONSIVE SCREEN

    function resizeScene() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    window.addEventListener('resize', resizeScene);

    // ANIMATION LOOP

    let animationFrame;

    function animate() {
        animationFrame = requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Stop rendering when the page is hidden to reduce laptop load.

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            cancelAnimationFrame(animationFrame);
            animate();
        }
    });
}
