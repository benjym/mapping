import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { AmmoPhysics } from '../node_modules/three/examples/jsm/physics/AmmoPhysics.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

var camera, scene, renderer, stats;
var physics, position;

var boxes, spheres;

init();

async function init() {

	physics = await AmmoPhysics();
	position = new THREE.Vector3();

	//

	camera = new THREE.PerspectiveCamera( 50, document.getElementById("three").clientWidth / document.getElementById("three").clientHeight, 0.1, 100 );
	camera.position.set( - 1, 1.5, 2 );
	camera.lookAt( 0, 0.5, 0 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x363636 );

	var light = new THREE.HemisphereLight();
	light.intensity = 0.35;
	scene.add( light );

	var light = new THREE.DirectionalLight();
	light.position.set( 5, 5, 5 );
	light.castShadow = true;
	light.shadow.camera.zoom = 2;
	scene.add( light );


    var nx = 100;
    var ny = 100;
    var floor = new THREE.Mesh(
        //     new THREE.PlaneGeometry(10,10,nx,ny),
		new THREE.BoxBufferGeometry( 10,2,10, nx, 2, ny ),
		// new THREE.ShadowMaterial( { color: 0x000000 } )
        new THREE.MeshStandardMaterial( { color: 0x111111 } )
	);
    floor.material.displacementMap = new THREE.TextureLoader().load('../marker.png');
    floor.material.displacementScale = 1.;
	floor.position.y = - 1;

    // floor.rotation.x = - Math.PI/2.;

	floor.receiveShadow = true;
	scene.add( floor );
	physics.addMesh( floor );

	//

	var material = new THREE.MeshLambertMaterial();

	var matrix = new THREE.Matrix4();
	var color = new THREE.Color();

	// Boxes

	var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
	boxes = new THREE.InstancedMesh( geometry, material, 100 );
	boxes.castShadow = true;
	boxes.receiveShadow = true;
	scene.add( boxes );

	for ( var i = 0; i < boxes.count; i ++ ) {

		matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
		boxes.setMatrixAt( i, matrix );
		boxes.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

	}

	physics.addMesh( boxes, 1 );

	// Spheres

	var geometry = new THREE.IcosahedronBufferGeometry( 0.075, 2 );
	spheres = new THREE.InstancedMesh( geometry, material, 100 );
	spheres.castShadow = true;
	spheres.receiveShadow = true;
	scene.add( spheres );

	for ( var i = 0; i < spheres.count; i ++ ) {

		matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
		spheres.setMatrixAt( i, matrix );
		spheres.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

	}

	physics.addMesh( spheres, 1 );

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( document.getElementById("three").clientWidth, document.getElementById("three").clientHeight );
	renderer.shadowMap.enabled = true;
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.getElementById('three').appendChild( renderer.domElement );

	stats = new Stats();
	document.getElementById('three').appendChild( stats.dom );

	//

	var controls = new OrbitControls( camera, renderer.domElement );
	controls.target.y = 0.5;
	controls.update();

	animate();

}

function animate() {

	requestAnimationFrame( animate );

	//

	var index = Math.floor( Math.random() * boxes.count );

	position.set( 0, Math.random() + 1, 0 );
	physics.setMeshPosition( boxes, position, index );

	//

	var index = Math.floor( Math.random() * spheres.count );

	position.set( 0, Math.random() + 1, 0 );
	physics.setMeshPosition( spheres, position, index );

	renderer.render( scene, camera );

	stats.update();

}