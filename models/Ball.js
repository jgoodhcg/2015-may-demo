/**
 * 
 */

Ball = function(radius, texture) {
    var sphereGeo = new THREE.SphereGeometry(radius,32,32)
    var sphereMat = new THREE.MeshPhongMaterial({
		ambient: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture(texture)
		});
    var sphere = new THREE.Mesh (sphereGeo, sphereMat);
	sphere.castShadow = true;
    var ballGroup = new THREE.Group();
    ballGroup.add(sphere);
    return ballGroup;
}

/* Inherit from THREE.Object3D */
Ball.prototype = Object.create (THREE.Object3D.prototype);
Ball.prototype.constructor = Ball;
