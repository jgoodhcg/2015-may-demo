/**
 * 
 */

CornerPocketPoint = function(bevel, bSize, tWidth, mirror) {
    var geo = new THREE.Geometry();

	if(!mirror){
    geo.vertices.push(
        // needs to match rails 2-d face that is extruded in the main
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, bSize * 2,0),
        new THREE.Vector3(bSize * 1.5 * 2, bSize * 1.75,0),
        new THREE.Vector3(bSize * 1.5 * 2, bSize * 1.45,0),
        new THREE.Vector3(0, 0, bevel - bSize*2),
        new THREE.Vector3(0, bSize*2, bevel - bSize*2)
    );}
	else{
		geo.vertices.push(
        // needs to match rails 2-d face that is extruded in the main
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, bSize * 2,0),
        new THREE.Vector3(bSize * 1.5 * 2, bSize * 1.75,0),
        new THREE.Vector3(bSize * 1.5 * 2, bSize * 1.45,0),
        new THREE.Vector3(0, 0, -(bevel - bSize*2)),
        new THREE.Vector3(0, bSize*2, -(bevel - bSize*2))
    );	
	}
	if(!mirror){
		geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
		geo.faces.push( new THREE.Face3( 3, 0, 2 ) );
		geo.faces.push( new THREE.Face3( 1, 5, 2 ) );
		geo.faces.push( new THREE.Face3( 3, 4, 0 ) );
		geo.faces.push( new THREE.Face3( 2, 5, 4 ) );
		geo.faces.push( new THREE.Face3( 2, 4, 3 ) );
		geo.faces.push( new THREE.Face3( 0, 4, 5 ) );
		geo.faces.push( new THREE.Face3( 5, 1, 0 ) );
	}
	else{
		geo.faces.push( new THREE.Face3( 2, 1, 0 ) ); 
		geo.faces.push( new THREE.Face3( 2, 0, 3 ) ); 
		geo.faces.push( new THREE.Face3( 1, 2, 5 ) ); 
		geo.faces.push( new THREE.Face3( 0, 4, 3 ) ); 
		geo.faces.push( new THREE.Face3( 4, 5, 2 ) );
		geo.faces.push( new THREE.Face3( 3, 4, 2 ) );
		geo.faces.push( new THREE.Face3( 0, 5, 4 ) ); 
		geo.faces.push( new THREE.Face3( 0, 1, 5 ) ); 
	}

	geo.computeFaceNormals();
	//geo.computeVertexNormals();
    geo.computeBoundingSphere();

    var mat = new THREE.MeshPhongMaterial({color:0x116611});
                                       
    var CpocketPoint = new THREE.Mesh (geo, mat);
	
    return CpocketPoint;
}

/* Inherit from THREE.Object3D */
CornerPocketPoint.prototype = Object.create (THREE.Object3D.prototype);
CornerPocketPoint.prototype.constructor = CornerPocketPoint;
