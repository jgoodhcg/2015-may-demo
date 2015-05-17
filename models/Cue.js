Cue = function(len) {
    var cueTipGeo = new THREE.CylinderGeometry (0.2, 0.2, (len * .0086));
    var cueTipMat = new THREE.MeshPhongMaterial({color:0x087695});
    var cueTip = new THREE.Mesh (cueTipGeo, cueTipMat);
	
	var cueWhiteGeo = new THREE.CylinderGeometry(0.2,0.2, (len * .0086) * 2);
	var cueWhiteMat = new THREE.MeshPhongMaterial({color:0xFFFFFF});
    var cueWhite = new THREE.Mesh (cueWhiteGeo, cueWhiteMat);
	
	var cueFrontGeo = new THREE.CylinderGeometry (0.25, 0.2, (len/2));
    var cueFrontMat = new THREE.MeshPhongMaterial({color:0xE4D990});
    var cueFront = new THREE.Mesh (cueFrontGeo, cueFrontMat);
	
	var cueBackGeo = new THREE.CylinderGeometry (0.35, 0.25, (len/2));
    var cueBackMat = new THREE.MeshPhongMaterial({color:0x2D1905});
    var cueBack = new THREE.Mesh (cueBackGeo, cueBackMat);

    var cueGroup = new THREE.Group();
	cueWhite.translateY((len * .0086));
	cueFront.translateY(len/4 + (len * .0086));
	cueBack.translateY(len/2 + len/4 + (len * .0086));
    cueGroup.add(cueTip);
	cueGroup.add(cueWhite);
	cueGroup.add(cueFront);
	cueGroup.add(cueBack);
	cueGroup.rotateX(Math.PI/2);
    return cueGroup;
}

/* Inherit from THREE.Object3D */
Cue.prototype = Object.create (THREE.Object3D.prototype);
Cue.prototype.constructor = Cue;