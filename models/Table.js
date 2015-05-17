/* Base of the table */

Table = function(l){

	var leg1Geo = new THREE.BoxGeometry((l/2),(l/3),(l/6));
	var leg1Mat = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var leg1 = new THREE.Mesh(leg1Geo, leg1Mat);

	var leg2 = leg1.clone();

	var baseGeo = new THREE.BoxGeometry((l/2), (l/8), l);
	var baseMat = new THREE.MeshBasicMaterial( {color: 0x5fff55} );
	var base = new THREE.Mesh(baseGeo, baseMat);

	
	var group = new THREE.Group();
	
	leg1.translateY(-((l/6) + (l/16)));
	leg2.translateY(-((l/6) + (l/16)));
	leg1.translateZ(l/6);
	leg2.translateZ(-l/6);

	group.add(leg1);
	group.add(leg2);
	group.add(base);

	group.translateY((l/3))
    return group;
}

Table.prototype = Object.create (THREE.Object3D.prototype);
Table.prototype.constructor = Table;