let camera, scene, renderer, cameraControl;

let group;
let el1, el2, el3;

function init() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x090b33, 5, 50);

	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	renderer.setSize(innerWidth, innerHeight);
	renderer.shadowMap.enable = true;

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 100);
	camera.position.set(16, 10, 12);
	camera.lookAt(scene.position);

	group = new THREE.Object3D();
	scene.add(group);

	function generateBall(r, color, name, x, y, z) {
		let sphereGeometry = new THREE.SphereGeometry(r, 32, 32);
		let sphereMaterial = new THREE.MeshLambertMaterial({ color });
		let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.name = name;
		sphere.position.set(x ?? 0, y ?? 0, z ?? 0);
		group.add(sphere);

		return sphere;
	}
	// generateBall(5, "#f24", "test");
	// generateBall(5, "#24f", "test", -5);
	// generateBall(5, "#2f4", "test", 5);

	let radius = 2,
		rotateStep = Math.PI / 4,
		colorChange = true;
	for (let angle_1 = 0; angle_1 < Math.PI * 2; angle_1 += rotateStep) {
		for (let angle_2 = 0; angle_2 < Math.PI * 2; angle_2 += rotateStep) {
			let layerRadius = Math.cos(angle_1) * radius;
			let ballColor = colorChange ? "red" : "#2c8ccc";

			generateBall(
				0.9,
				ballColor,
				"atom",
				layerRadius * Math.cos(angle_2),
				radius * Math.sin(angle_1),
				layerRadius * Math.sin(angle_2)
			);

			colorChange = !colorChange;
		}
		colorChange = !colorChange;
	}

	el1 = {
		orbit_r: 10,
		orbit_speed: 0.05,
		angle: Math.random() * Math.PI * 2,
		obj: generateBall(0.2, "#aaabbb", "el1"),
	};
	el2 = {
		orbit_r: 10,
		orbit_speed: 0.05,
		angle: Math.random() * Math.PI * 2,
		obj: generateBall(0.2, "#aaabbb", "el2"),
	};
	el3 = {
		orbit_r: 10,
		orbit_speed: 0.05,
		angle: Math.random() * Math.PI * 2,
		obj: generateBall(0.2, "#aaabbb", "el3"),
	};

	// Add Lights
	let ambientLight = new THREE.AmbientLight("#333");
	scene.add(ambientLight);

	// Like Sun Light
	let directionalLight = new THREE.DirectionalLight("#fff", 0.5);
	scene.add(directionalLight);

	let spotLight = new THREE.SpotLight({ color: "fff" });
	spotLight.position.set(-20, 20, 10);
	spotLight.CastShadows = true;
	scene.add(spotLight);

	cameraController = new THREE.OrbitControls(camera, renderer.domElement);
}
init();

function render() {
	renderer.render(scene, camera);
	cameraController.update();

	el1.obj.position.x = el1.orbit_r * Math.cos(el1.angle);
	el1.obj.position.y = el1.orbit_r * Math.sin(el1.angle);
	el1.angle += el1.orbit_speed;

	el2.obj.position.x = el2.orbit_r * Math.cos(el2.angle);
	el2.obj.position.z = el2.orbit_r * Math.sin(el2.angle);
	el2.angle += el2.orbit_speed;

	el3.obj.position.y = el3.orbit_r * Math.cos(el3.angle);
	el3.obj.position.z = el3.orbit_r * Math.sin(el3.angle);
	el3.angle += el3.orbit_speed;

	group.rotation.y += 0.002;

	requestAnimationFrame(render);
}
render();

addEventListener("resize", () => {
	camera.aspect = innerWidth / innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(innerWidth, innerHeight);
});
