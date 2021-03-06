let hamburger = document.querySelector(".hamburger");
let sceneContainer = document.querySelector(".scene");
let title = document.querySelector(".cover .title");
let mobileNav = document.querySelector(".mobile-nav");

function toggleNav() {
    hamburger = document.querySelector(".hamburger");
    sceneContainer = document.querySelector(".scene");
    title = document.querySelector(".cover .title");
    mobileNav = document.querySelector(".mobile-nav");

    hamburger.classList.toggle("is-active");
    mobileNav.classList.toggle("is-active");
    setTimeout(function() {
        if(sceneContainer != null)
            sceneContainer.classList.toggle("disabled");
        if(title != null)
            title.classList.toggle("disabled");
    }, 110);
}

hamburger.addEventListener("click", toggleNav);

barba.use(barbaCss);

barba.init({
    transitions: [
        {
            name: 'home',
            to: {
                namespace: ['home'],
            },
            beforeOnce() {
                // console.log("BEFORE ONCE");
            },
            once() {},
            afterOnce() {
                // console.log("AFTER ONCE");
            },
            leave() {},
            enter() {},
            beforeEnter() {
                init3dObj(true);
                initTyped();
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

// THREE.js

let container;
let camera;
let renderer;
let scene;
let codeWindowObj;
let xPos, yPos, zPos;


function init3dObj(restarted = false) {
    container = document.querySelector(".scene");

    // Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    var lessThan900Px = false;
    if(window.innerWidth <= 900) lessThan900Px = true;
    if(lessThan900Px) {
        xPos = 0;
        yPos = container.clientHeight * 0.0001;
        zPos = 28;
    } else {
        xPos = -(container.clientWidth*0.003);
        yPos = 4;
        zPos = 17;
    }
    // Camera setup.
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(xPos, yPos, zPos);

    // Lighting
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(xPos, 40, 10);
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
    var lessThan900Px = false;
    if(window.innerWidth <= 900) lessThan900Px = true;
    if(lessThan900Px) {
        xPos = 0;
        yPos = container.clientHeight * 0.0001;
        zPos = 28;
    } else {
        xPos = -(container.clientWidth*0.003);
        yPos = 4;
        zPos = 17;
    }
    camera.position.set(xPos, yPos, zPos);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

init3dObj();
window.addEventListener("resize", onWindowResize);

//////////////////////////////////////////////////////////////
// Typed.js

function initTyped() {
    var options = {
        strings: ['^1000I\'m Tahir.^2000', 'I\'m a Developer.^1000'],
        typeSpeed: 100,
        backSpeed: 80,
        loop: true,
      };
      
    var typed = new Typed('.typed-element', options);
}

initTyped();