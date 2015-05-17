/**
 * 
 */

NewtBall = function(diameter,cubemap) {
    var sphereGeo = new THREE.SphereGeometry(diameter,32,32)
    //var sphereMat = new THREE.MeshPhongMaterial({color:0x578231});
	var sphereMat = new THREE.MeshBasicMaterial ({envMap:cubemap});
    var sphere = new THREE.Mesh (sphereGeo, sphereMat);

    var diskGeo = new THREE.CylinderGeometry(diameter+0.1,1.21,0.05,32);
    var diskMat = new THREE.MeshPhongMaterial({color:0xAE1818});
    var disk = new THREE.Mesh (diskGeo, diskMat);

    var ballGroup = new THREE.Group();
    //disk.rotateX (Math.PI / 2);
    ballGroup.add(sphere);
    ballGroup.add(disk);

    return ballGroup;
}

/* Inherit from THREE.Object3D */
NewtBall.prototype = Object.create (THREE.Object3D.prototype);
NewtBall.prototype.constructor = NewtBall;
