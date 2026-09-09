// ==================== THREE.JS BACKGROUND ====================
(function initThreeBackground() {
    const canvas = document.getElementById('three-bg');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x06060e, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 20);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xf472b6, 1.5, 20);
    pointLight2.position.set(-5, -2, 3);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0x22d3ee, 1.5, 20);
    pointLight3.position.set(0, 4, -4);
    scene.add(pointLight3);

    // Particles
    const particlesCount = 700;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
        const c = new THREE.Color().setHSL(0.65 + Math.random() * 0.2, 0.7, 0.5 + Math.random() * 0.4);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Central torus knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.5, 0.45, 100, 16);
    const torusKnotMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a3a,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x111122,
        emissiveIntensity: 0.5,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(0, 0, -2);
    scene.add(torusKnot);

    // Rings
    const ringGeo = new THREE.TorusGeometry(2.8, 0.03, 32, 100);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.2,
        metalness: 0.9,
        emissive: 0x3344aa,
        emissiveIntensity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(0, 0, -2);
    ring.rotation.x = Math.PI / 2.2;
    ring.rotation.z = 0.5;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.2, 0.04, 24, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        roughness: 0.25,
        metalness: 0.85,
        emissive: 0x442233,
        emissiveIntensity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.set(0, 0.2, -2);
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = -0.3;
    scene.add(ring2);

    // Small spheres
    const smallSpheres = [];
    const sphereData = [
        { x: 3, y: 1.5, z: -1, color: 0xf472b6, s: 0.2 },
        { x: -3, y: -1, z: 0.5, color: 0x22d3ee, s: 0.16 },
        { x: 2, y: -2, z: 2, color: 0x6366f1, s: 0.18 },
        { x: -2.5, y: 2, z: 1.5, color: 0xa78bfa, s: 0.14 },
        { x: 0.5, y: 2.5, z: -3, color: 0x34d399, s: 0.22 },
    ];
    sphereData.forEach(d => {
        const geo = new THREE.SphereGeometry(d.s, 32, 32);
        const mat = new THREE.MeshStandardMaterial({
            color: d.color,
            roughness: 0.2,
            metalness: 0.7,
            emissive: d.color,
            emissiveIntensity: 0.3,
        });
        const sphere = new THREE.Mesh(geo, mat);
        sphere.position.set(d.x, d.y, d.z);
        scene.add(sphere);
        smallSpheres.push({ 
            mesh: sphere, 
            base: { x: d.x, y: d.y, z: d.z }, 
            speed: 0.3 + Math.random() * 0.5, 
            offset: Math.random() * 10 
        });
    });

    // Animation
    let clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        const t = clock.getElapsedTime();
        
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        
        torusKnot.rotation.x += 0.003;
        torusKnot.rotation.y += 0.004;
        
        ring.rotation.z += 0.002;
        ring.rotation.x += 0.001;
        
        ring2.rotation.z
