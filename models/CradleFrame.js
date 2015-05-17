
CradleFrame = function(width){
	
	var group = new THREE.Group();
	
	var frame1 = new SwingFrame();
	var frame2 = new SwingFrame();
	
	frame1.translateX(+width);
	frame2.translateX(-width);
	
	group.add (frame1);
	group.add (frame2);
	
	return group;
}

/* Inherit from Object3D */
CradleFrame.prototype = Object.create (THREE.Object3D.prototype);
CradleFrame.prototype.constructor = CradleFrame;