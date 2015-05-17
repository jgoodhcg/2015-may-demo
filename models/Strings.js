Wires = function(length, space, angle, dia){
	var geometry = new THREE.CylinderGeometry(dia, dia , length);
	var material = new THREE.MeshPhongMaterial({color:0x578231});
	var stringL = new THREE.Mesh(geometry,material);
	var stringR = new THREE.Mesh(geometry,material);
	
	var stringGroup = new THREE.Group();
	stringL.translateY (-space/2);
	stringL.rotateZ(-angle);
	stringR.translateY (space/2);
	stringR.rotateZ(angle);

	stringGroup.add(stringL);
	stringGroup.add(stringR);
	
	return stringGroup;
}

Wires.prototype = Object.create (THREE.Object3D.prototype);
Wires.prototype.constructor = Wires;
}