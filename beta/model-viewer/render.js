import * as THREE from './lib/three/build/three.module.js';
import { GLTFLoader } from './lib/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './lib/three/examples/jsm/controls/OrbitControls.js';

const positions = {
    camera: {
        x: 0,
        y: 40,
        z: 30
    },
    model: {
        x: 0,
        y: 0,
        z: -10
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);
camera.position.set( positions.camera.x, positions.camera.y, positions.camera.z );
camera.lookAt( positions.model.x, positions.model.y, positions.model.z );

const light = new THREE.AmbientLight( 0x404040, 3.5 );
scene.add( light );

var gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();
loader.load( "models/ketelr.glb", ( gltf ) => {
	scene.add( gltf.scene );
    gltf.scene.position.set( positions.model.x, positions.model.y, positions.model.z );
}, undefined, function ( error ) {
	console.error( error );
} );

controls.update();

const animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

animate();
