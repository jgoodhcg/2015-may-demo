
Cradle = function(width){
	
	var group = Three.group();
	
	var frame1 = new SwingFrame();
	var frame2 = new SwingFrame();
	
	frame1.translateZ(+width);
	frame1.translatez(-width);
	
	group.add (frame1);
	group.add (frame2);
	
	return group;
}

/* Inherit from Object3D */
Cradle.prototype = Object.create (THREE.Object3D.prototype);
Cradle.prototype.constructor = Cradle;