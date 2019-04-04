var scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,0.5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var planeGeo = new THREE.PlaneGeometry( 1, 1, 1 );
var sphereGeo = new THREE.SphereGeometry( 0.1, 16, 16);
var material = new THREE.MeshNormalMaterial();
var floor = new THREE.Mesh( planeGeo, material );
var ceiling = new THREE.Mesh( planeGeo, material );
var backWall = new THREE.Mesh( planeGeo, material );
var leftWall = new THREE.Mesh( planeGeo, material );
var rightWall = new THREE.Mesh( planeGeo, material );
var frontWall = new THREE.Mesh( planeGeo, material );
var sphere1 = new THREE.Mesh(sphereGeo, material);
var sphere2 = new THREE.Mesh(sphereGeo, material);
var sphere3 = new THREE.Mesh(sphereGeo, material);
floor.rotation.x = THREE.Math.degToRad(-90)
floor.position.y = -0.5;
ceiling.rotation.x = THREE.Math.degToRad(90)
ceiling.position.y = 0.5;
leftWall.rotation.y = THREE.Math.degToRad(-90)
leftWall.position.x = 0.5
rightWall.position.x = -0.5;
rightWall.rotation.y = THREE.Math.degToRad(90)
backWall.position.z = -0.5;
frontWall.rotation.x = THREE.Math.degToRad(180);
frontWall.position.z = 0.5;
sphere1.position.set(0,0,0);
sphere2.position.set(-0.3, 0.2, -0.3);
sphere3.position.set(0.3, 0.3, -0.5);
scene.add(floor);
scene.add(ceiling)
scene.add(backWall);
scene.add(leftWall);
scene.add(rightWall);
scene.add(frontWall);
scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
