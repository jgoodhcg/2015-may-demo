Wires = function(length, space, angle, dia){
	var geometry = new THREE.CylinderGeometry(dia, dia , length);
	var material = new THREE.MeshPhongMaterial({color:0xffffff});
	var stringL = new THREE.Mesh(geometry,material);
	var stringR = new THREE.Mesh(geometry,material);
	
	/* a little trig to put the point of rotation at the end of the wire */
	var t = (length/2) * Math.cos(angle);
	stringR.translateY(-t);
	stringL.translateY(-t);
	

	var stringGroup = new THREE.Group();
	stringL.translateX (-space/2);
	stringL.rotateZ(-angle);
	stringR.translateX (space/2);
	stringR.rotateZ(angle);
	stringGroup.add(stringL);
	stringGroup.add(stringR);

	return stringGroup;
}

Wires.prototype = Object.create (THREE.Object3D.prototype);
Wires.prototype.constructor = Wires;
