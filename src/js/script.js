barba.use(barbaCss);

barba.init({
    transitions: [
        {
            name: 'home',
            to: {
                namespace: ['home'],
            },
            beforeOnce() {
                console.log("BEFORE ONCE");
            },
            once() {},
            afterOnce() {
                console.log("AFTER ONCE");
            },
            leave() {},
            enter() {},
            beforeEnter() {
                init3dObj(true);
            },
            sync: true,
        }, {
            name: 'fade',
            to: {
                namespace: ['fade']
            },
            leave() {},
            enter() {},
            sync: true,
        }
    ]
});

//////////////////////////////////////////

let container;
let camera;
let renderer;
let scene;
let codeWindowObj;


function init3dObj(restarted = false) {
    container = document.querySelector(".scene");

    // Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // Camera setup.
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-5, 4, 17);

    // Lighting
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-5, 40, 10);
    scene.add(light);

    // Renderer.
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Load Model.
    let loader = new THREE.GLTFLoader();
    loader.load('../assets/3d/code-window.glb', function(gltf){
        scene.add(gltf.scene);
        codeWindowObj = gltf.scene.children[0];
        if(!restarted)
            animate3dObj();
    });
}

function animate3dObj() {
    requestAnimationFrame(animate3dObj);
    codeWindowObj.rotation.z += 0.005;
    codeWindowObj.rotation.y += 0.005;
    codeWindowObj.rotation.x += 0.005;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

init3dObj();
window.addEventListener("resize", onWindowResize);