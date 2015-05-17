
	// detect WebGL
	if( !Detector.webgl ){
		Detector.addGetWebGLMessage();
		throw 'WebGL Not Available'
	} 
	// setup webgl renderer full page
	var renderer2	= new THREE.WebGLRenderer({ antialias: true });
	renderer2.autoClear = false;
    var gbox2 = document.getElementById('graphicsbox');
     var gbox2Width = $("#graphicsbox").width();
     console.log(gbox2Width);
     var CANVAS_WIDTH = gbox2Width, CANVAS_HEIGHT = gbox2Width * (9/16);
	renderer2.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    //document.body.appendChild(gbox2);
	gbox2.appendChild( renderer2.domElement );
	

	// setup a scene and camera
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
    camera.up.set(0,1,0); //y is up
    camera.position.set(0,96,96);
    // camera.position.y = 96;
	// camera.position.z = 96;
	// //camera.position.x = 96/2;

	// set up collision detection //////////////////////////////
	var colliderSystem = new THREEx.ColliderSystem();
	var colliders = [];

	var tWidth = 48;
	var tLength = 96;
	// declare the rendering loop
	var onRenderFcts= [];

	// handle window resize events
	var winResize	= new THREEx.WindowResize(renderer2, camera)

	//////////////////////////////////////////////////////////////////////////////////
	//		default 3 points lightning					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var ambientLight= new THREE.AmbientLight( 0x202020 )
	scene.add( ambientLight)
	var frontLight	= new THREE.DirectionalLight(0xffffff, 1);
//	frontLight.castShadow = true;
	frontLight.position.set(10, 35, 0.0)
	scene.add( frontLight )
    //scene.add ( new THREE.DirectionalLightHelper (frontLight, 1));
	scene.add(frontLight);
	var backLight	= new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight.castShadow = true;
	//backLight.shadowCameraVisible = true;
	backLight.shadowCameraNear = 20;
	backLight.shadowCameraFar = 200;
	backLight.shadowCameraRight =  20;
	backLight.shadowCameraLeft = -20;
	backLight.shadowCameraTop =  20;
	backLight.shadowCameraBottom = -20;
	backLight.position.set(0, 45, 60)
	
	var backLight2	= new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight2.castShadow = true;
	//backLight2.shadowCameraVisible = true;
	backLight2.shadowCameraNear = 20;
	backLight2.shadowCameraFar = 200;
	backLight2.shadowCameraRight =  20;
	backLight2.shadowCameraLeft = -20;
	backLight2.shadowCameraTop =  20;
	backLight2.shadowCameraBottom = -20;
	backLight2.position.set(0, 45, -60)
	backLight2.lookAt(new THREE.Vector3(0,0,tLength/2));
	
	
	scene.add( backLight )
   // scene.add ( new THREE.SpotLightHelper (backLight, 0.2));
 //	scene.add( backLight2 )
   // scene.add ( new THREE.SpotLightHelper (backLight2, 0.2));
	
    //////////////////////////////////////////////////////////////////////////////////
	// Table Top
	//////////////////////////////////////////////////////////////////////////////////

    var groundPlane = new THREE.PlaneBufferGeometry(tWidth, tLength, 100, 100);
    /* attach the texture as the "map" property of the material */
	var groundMat = new THREE.MeshPhongMaterial({color:0x116611});
    var ground = new THREE.Mesh (groundPlane, groundMat);	
    ground.rotateX(THREE.Math.degToRad(-90));
	ground.receiveShadow = true;
    scene.add (ground);

	/////////////////////////////////////////////////////////////////////////////////////////
    // Cannon init
    /////////////////////////////////////////////////////////////////////////////////////////
  	var bSize = 1.125;
	var bSizeMeter = bSize * 0.0254;


    canWorld = new CANNON.World();
    canWorld.gravity.set(0,-9.82,0);
    canWorld.broadphase = new CANNON.NaiveBroadphase();
    canWorld.solver.iterations = 10;
    
    // Create a plane CANNON
	var groundBody = new CANNON.Body({
    	mass: 0 // mass == 0 makes the body static
	});
	var groundShape = new CANNON.Plane();
	groundBody.addShape(groundShape);
	//Ground Physics
    var rot = new CANNON.Vec3(1,0,0)
    groundBody.quaternion.setFromAxisAngle(rot,(Math.PI/2))
    groundBody.position.set(0,0,0);
    groundBody.quaternion.copy(ground.quaternion);
    groundBody.position.copy(ground.position);
    
	canWorld.addBody(groundBody);
    
    
    var timeStep = 1.0/60.0; // seconds


    ////////////////////////////////
    function updatePhysics(){

    	// Step the phsyics world
    	canWorld.step(timeStep);

    	// copy coords
    	cueBall.position.copy(cueBallCANb.position);
    	cueBall.quaternion.copy(cueBallCANb.quaternion);

    	// rest of balls
    	for (var i=0, l=bodies.length; i < l; i++) { //we loop through each body
		    var body = bodies[i]; //this will be the current body
		    //MOVE THE BODY AND UPDATE THE MESH HERE
		    body.mesh.position.copy(body.body.position);
		    body.mesh.quaternion.copy(body.body.quaternion);
		}
    		
    }

 
    //////////////////////////////////////////////////////////////////////////////////
	//		Render balls
	//////////////////////////////////////////////////////////////////////////////////	
	

	var cueBall = new Ball(bSize, 'textures/PoolBallSkins/BallCue.jpg');
	
	ballArray = [new Ball(bSize, 'textures/PoolBallSkins/Ball1.jpg'), new Ball(bSize, 'textures/PoolBallSkins/Ball2.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball3.jpg'), new Ball(bSize, 'textures/PoolBallSkins/Ball4.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball5.jpg'), new Ball(bSize, 'textures/PoolBallSkins/Ball6.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball7.jpg'),new Ball(bSize, 'textures/PoolBallSkins/Ball8.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball9.jpg'),new Ball(bSize, 'textures/PoolBallSkins/Ball10.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball11.jpg'),new Ball(bSize, 'textures/PoolBallSkins/Ball12.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball13.jpg'),new Ball(bSize, 'textures/PoolBallSkins/Ball14.jpg'),
		new Ball(bSize, 'textures/PoolBallSkins/Ball15.jpg')];
	
	var cb_cf = new THREE.Matrix4();
	ballCFArray = [new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), 
		new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), 
		new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4(), new THREE.Matrix4()];
	
	scene.add(cueBall);
	var cueBallStartTimer=null;
	var cueBallCollider = THREEx.Collider.createFromObject3d(cueBall);
	var cueBallEnergy = 0;
	colliders.push(cueBallCollider);
	cue_is_moveing = false;
	cueBall.useQuaternion = true;

	// cue ball in caonnon
    var massBall = 16500 // kg?
    // Create a sphere
	var radius = 1; // m
	var cueBallCANb = new CANNON.Body({
   		mass: massBall, // kg
   		position: new CANNON.Vec3(0, 0, 0), // m
   		shape: new CANNON.Sphere(bSize)
	});
	canWorld.addBody(cueBallCANb);


	var bodies = []; // CANNON BODIES

	var q = 0;
	for(ball in ballArray)
	{
		ballArray[ball].castShadow = true;
		ballArray[ball].receiveShadow = true;
		scene.add(ballArray[ball]);
		var collider = THREEx.Collider.createFromObject3d(ballArray[ball]);
		colliders.push(collider);
		ballArray[ball].useQuaternion = true;

		bodies.push({ //insert into the array an object that contains the information for each body/mesh
        	// Create a sphere
			body: new CANNON.Body({
   				mass: massBall, // kg
   				position: new CANNON.Vec3(0, bSizeMeter*2, (bSizeMeter*2)+q), // m
   				shape: new CANNON.Sphere(bSize),
			}),
			mesh: ballArray[ball]
			
    	});
    	q += 3;

	}

		for (var i=0, l=bodies.length; i < l; i++) { //we loop through each body
		    var body = bodies[i]; //this will be the current body
		    //MOVE THE BODY AND UPDATE THE MESH HERE
		    //body.body.position.set(0,0,0);
		    canWorld.add(body.body);
		}
	
	scene.add(new THREE.AxisHelper(4));


	var holeMat = new THREE.MeshBasicMaterial({color: 0x000000});
	var holeGeo = new THREE.CircleGeometry(bSize * 2, 32);
	var holeCR = new THREE.Mesh(holeGeo, holeMat);

	var footSpotGeo1 = new THREE.CircleGeometry(bSize/2);
	var footSpot1 = new THREE.Mesh(footSpotGeo1, holeMat);
	
	var footSpotMat2 = new THREE.MeshBasicMaterial({color:0xffffff});
	var footSpotGeo2 = new THREE.CircleGeometry(bSize/4);
	var footSpot2 = new THREE.Mesh(footSpotGeo2, footSpotMat2);
	
	var cueStick = new Cue(59);
	
	var holeCL = holeCR.clone();
	var holeSR = holeCR.clone();
	var holeSL = holeCR.clone();
	var holeBCR = holeCR.clone();
	var holeBCL = holeCR.clone();
	var holeHeight = .05;
	
	footSpot1.translateY(holeHeight);
	footSpot1.rotateX(-Math.PI/2);
	footSpot1.translateY(tLength/4)
	footSpot2.translateY(holeHeight*2);
	footSpot2.rotateX(-Math.PI/2);
	footSpot2.translateY(tLength/4)
	
	holeCR.translateZ(-tLength/2);
	holeCR.translateX(tWidth/2);
	holeCR.translateY(holeHeight);
	holeCR.rotateX(-Math.PI/2);

	holeCL.translateZ(-tLength/2);
	holeCL.translateX(-tWidth/2);
	holeCL.translateY(holeHeight);
	holeCL.rotateX(-Math.PI/2);

	holeSR.translateX(tWidth/2);
	holeSR.translateY(holeHeight);
	holeSR.rotateX(-Math.PI/2);

	holeSL.translateX(-tWidth/2);
	holeSL.translateY(holeHeight);
	holeSL.rotateX(-Math.PI/2);

	holeBCR.translateZ(tLength/2);
	holeBCR.translateX(tWidth/2);
	holeBCR.translateY(holeHeight);
	holeBCR.rotateX(-Math.PI/2);

	holeBCL.translateZ(tLength/2);
	holeBCL.translateX(-tWidth/2);
	holeBCL.translateY(holeHeight);
	holeBCL.rotateX(-Math.PI/2);

	scene.add(footSpot1);
	scene.add(footSpot2);
	scene.add(holeCR);
	scene.add(holeCL);
	scene.add(holeSR);
	scene.add(holeSL);
	scene.add(holeBCR);
	scene.add(holeBCL);
	
	cueStick.translateY(-tLength/4);
	cueStick.translateX(8.3);
	cueStick.translateZ(-30)
	cueStick.rotateX(Math.PI/2);
	cueStick.rotateZ(-Math.PI/6);
	scene.add(cueStick);
		
	//////////////////////////////////////////////////////////////////////////////////
	// RAILS ////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	var pts = [];
	
	pts.push(new THREE.Vector2(-tWidth/2, 0));
	pts.push(new THREE.Vector2(-tWidth/2, bSize * 2));
	pts.push(new THREE.Vector2((-tWidth/2) + (bSize * 1.5 * 2), bSize * 1.75));
	pts.push(new THREE.Vector2((-tWidth/2) + (bSize * 1.5 * 2), bSize * 1.45));

	var bevelOffset = (4 * bSize * 1.5 );
	var extrudeSettings = {
		curveSegments: 8, amount: ((tLength/2) - bevelOffset*2),
		bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};

	var triangle = new THREE.Shape(pts);
	var railGeo = new THREE.ExtrudeGeometry(triangle, extrudeSettings);
	//var railMat = new THREE.MeshLambertMaterial({color:0xFB7200, wireframe:false});
	var railMat = new THREE.MeshPhongMaterial({color:0x116611});
	
	var rail1 = new THREE.Mesh(railGeo, railMat); //front side left
	var rail2 = rail1.clone(); //back side left
	var rail3 = rail1.clone(); //front side right
	var rail4 = rail1.clone(); //back side right
	var rail5 = rail1.clone(); //front
	var rail6 = rail1.clone(); //back

	rail1.translateZ(-((tLength/2) - bevelOffset));
	rail2.translateZ(bevelOffset);
	rail3.rotateZ(Math.PI);
	rail3.rotateX(Math.PI);
	rail3.translateZ(bevelOffset);
	rail4.rotateZ(Math.PI);
	rail4.rotateX(Math.PI);
	rail4.translateZ(-((tLength/2) - bevelOffset));
	rail5.rotateY(Math.PI/2);
	rail5.rotateZ(Math.PI);
	rail5.rotateX(Math.PI);
	rail5.translateX(-tLength/4);
	rail5.translateZ((-tLength/4) + bevelOffset);
	rail6.rotateY(Math.PI/2);
	rail6.translateX(-tLength/4);
	rail6.translateZ((-tLength/4) + bevelOffset);
	
	scene.add(rail1);
	scene.add(rail2);
	scene.add(rail3);
	scene.add(rail4);
	scene.add(rail5);
	scene.add(rail6);

	var cppL1 = new CornerPocketPoint(bevelOffset, bSize, tWidth, false);
	var cppBL1 = cppL1.clone();
	var cppR1 = cppL1.clone();
	var cppBR1 = cppL1.clone();
	var cppSL1 = cppL1.clone();
	var cppSR1 = cppL1.clone();
	var cppL2 = new CornerPocketPoint(bevelOffset, bSize, tWidth, true);
	var cppBL2 = cppL2.clone();
	var cppR2 = cppL2.clone();
	var cppBR2 = cppL2.clone();
	var cppSL2 = cppL2.clone();
	var cppSR2 = cppL2.clone();
	
	cppL1.translateZ(-tLength/2);
	cppL1.translateX(-((tWidth/2) - bevelOffset));
	cppL1.rotateY(-Math.PI/2);
	cppBL1.translateZ(tLength/2 - bevelOffset);
	cppBL1.translateX(-tLength/4);
	cppR1.rotateY(Math.PI);
	cppR1.translateX(-tLength/4);
	cppR1.translateZ(tLength/2 - bevelOffset);
	cppBR1.rotateY(Math.PI/2);
	cppBR1.translateZ(tLength/4 - bevelOffset);
	cppBR1.translateX(-tLength/2);
	cppL2.translateZ(-tLength/2 + bevelOffset);
	cppL2.translateX(-tLength/4);
	cppBL2.rotateY(Math.PI/2);
	cppBL2.translateX(-tLength/2);
	cppBL2.translateZ(-tLength/4 + bevelOffset);
	cppR2.rotateY(-Math.PI/2);
	cppR2.translateZ(-tLength/4 + bevelOffset);
	cppR2.translateX(-tLength/2);
	cppBR2.rotateY(Math.PI);
	cppBR2.translateZ(-tLength/2 + bevelOffset);
	cppBR2.translateX(-tLength/4);
	
	cppSL1.translateZ(-bevelOffset);
	cppSL1.translateX(-tLength/4);
	cppSL2.translateZ(bevelOffset);
	cppSL2.translateX(-tLength/4);
	
	cppSR1.rotateY(Math.PI);
	cppSR1.translateZ(-bevelOffset);
	cppSR1.translateX(-tLength/4);
	cppSR2.rotateY(Math.PI);
	cppSR2.translateZ(bevelOffset);
	cppSR2.translateX(-tLength/4);
	
	scene.add(cppR1);
	scene.add(cppBR1);
	scene.add(cppBL1);
	scene.add(cppL1);
	scene.add(cppR2);
	scene.add(cppBR2);
	scene.add(cppBL2);
	scene.add(cppL2);
	
	scene.add(cppSL1);
	scene.add(cppSL2);
	scene.add(cppSR1);
	scene.add(cppSR2);
	

    camera.lookAt(new THREE.Vector3(0, 5, 0));

    

    /////////////////////////////////////////////////////////////////////////////////
    // Helpers
    /////////////////////////////////////////////////////////////////////////////////

	function rackBalls(){
		var y = bSize;
		var zDiff = (1/2) * (bSize * 2) * Math.sqrt(3);
		var xDiff = (1/2) * (bSize * 2);

		var cuePos = new THREE.Vector3(0,y,tLength/4);
		cueBallCANb.position.set(0,y,tLength/4); // CANNON set

		var points = [new THREE.Vector3(0,y,-tLength/4), 
			new THREE.Vector3(xDiff,y,-tLength/4-zDiff),new THREE.Vector3(-xDiff,y,-tLength/4-zDiff),
			new THREE.Vector3(xDiff * 2,y,-tLength/4-(zDiff*2)),new THREE.Vector3(0,y,-tLength/4-(zDiff*2)),new THREE.Vector3(-xDiff * 2,y,-tLength/4-(zDiff*2)),
			new THREE.Vector3(xDiff * 3,y,-tLength/4-(zDiff*3)),new THREE.Vector3(xDiff,y,-tLength/4-(zDiff*3)),new THREE.Vector3(-xDiff,y,-tLength/4-(zDiff*3)),
			new THREE.Vector3(-xDiff * 3,y,-tLength/4-(zDiff*3)),new THREE.Vector3(xDiff * 4,y,-tLength/4-(zDiff*4)),new THREE.Vector3(xDiff * 2,y,-tLength/4-(zDiff*4)),
			new THREE.Vector3(0,y,-tLength/4-(zDiff*4)),new THREE.Vector3(-xDiff * 2,y,-tLength/4-(zDiff*4)),new THREE.Vector3(-xDiff * 4,y,-tLength/4-(zDiff*4))];

		cb_cf.copy(new THREE.Matrix4().setPosition(cuePos));
	
		for(p in points)
		{
			ballCFArray[p].copy(new THREE.Matrix4().setPosition(points[p]));
			ballArray[p].velocity = new CANNON.Vec3(0,0,0);
			updateBall(ballCFArray[p], ballArray[p]);
		}

		// cannon set
		for (var i=0, l=bodies.length; i < l; i++) { //we loop through each body
		    var body = bodies[i]; //this will be the current body
		    //MOVE THE BODY AND UPDATE THE MESH HERE
		    body.body.position = new CANNON.Vec3(points[i].x,points[i].y,points[i].z);
		    body.body.velocity = new CANNON.Vec3(0,0,0);
		}

		updateBall(cb_cf, cueBall);
		return;
	};
	function updateBall(ballCF, ballObj){
		var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var vscale = new THREE.Vector3();

        ballCF.decompose(tran, quat, vscale);
        ballObj.position.copy(tran);
        ballObj.quaternion.copy(quat);

		return;
	};

    function cameraDirection(camera) {
        var vector = new THREE.Vector3(0, 0, -1);
        //vector.applyQuaternion( camera.quaternion );
        vector.applyEuler(camera.rotation, camera.rotation.order);
        return vector;
    };

	 //////////////////////////////////////////////////////////////////////////////////
	/* Collider Listeners */
	//////////////////////////////////////////////////////////////////////////////////
	var onCollideEnter  = collider.addEventListener('contactEnter', function(otherCollider){
    console.log('contactEnter with', otherCollider.id)
	
	});
	var onCollideEnter  = collider.addEventListener('contactExit', function(otherCollider){
    console.log('contactExit with', otherCollider.id)
	
	});
	// var onCollideEnter  = collider.addEventListener('contactStay', function(otherCollider){
 //    console.log('contactStay with', otherCollider.id)
	
	// });
    var onCollideEnter  = collider.addEventListener('contactRemoved', function(otherCollider){
    console.log('contactRemoved with', otherCollider.id)
	
	});
    //////////////////////////////////////////////////////////////////////////////////
	/* game engine */
	//////////////////////////////////////////////////////////////////////////////////
	// window resizing fix
	onRenderFcts.push( function(){
		var gbox2 = document.getElementById('graphicsbox');
     		var gbox2Width = $("#graphicsbox").width();
    		var CANVAS_WIDTH = gbox2Width, CANVAS_HEIGHT = gbox2Width * (9/16);
		renderer2.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    
	});	

	onRenderFcts.push(function(delta, now){
		updatePhysics();

	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	controls = new THREE.OrbitControls(camera, renderer2.domElement);

	onRenderFcts.push(function(delta, now){
		controls.update();
	});
	//////////////////////////////////////////////////////////////////////////////////
	//		Key Listener							//
	//////////////////////////////////////////////////////////////////////////////////
	 document.addEventListener('keypress', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'r') {
            rackBalls();
        }
        if (key == 'c') {
        	var trans = new THREE.Vector3();
        	var quat = new THREE.Quaternion();
        	var vscale = new THREE.Vector3();

        	cb_cf.decompose(trans, quat, vscale);

        	var newX = trans.x;
        	var newY = trans.y + 2;
        	var newz = trans.z + 10;

        	camera.position.set(newX,newY,newz);
        	controls.target = trans;
        	console.log("pressed c");
        }
        if (key == 't'){
        	var world = new THREE.Vector3();
        	camera.position.set(0,96,96);
        	controls.target = world;
        }
		if (key == 'w'){
			var trans = new THREE.Vector3();
			cueBallCANb.velocity = new CANNON.Vec3(0,0,0);
			cb_cf.decompose(trans, new THREE.Quaternion(), new THREE.Vector3());
			cb_cf.copy(new THREE.Matrix4().setPosition(new THREE.Vector3(trans.x,trans.y,trans.z-1)));
			updateBall(cb_cf, cueBall);
			cueBallCANb.position.set(cueBall.position.x,cueBall.position.y,cueBall.position.z);

		}
		if (key == 'a'){
			var trans = new THREE.Vector3();
			cb_cf.decompose(trans, new THREE.Quaternion(), new THREE.Vector3());
			cueBallCANb.velocity = new CANNON.Vec3(0,0,0);
			cb_cf.copy(new THREE.Matrix4().setPosition(new THREE.Vector3(trans.x-1,trans.y,trans.z)));
			updateBall(cb_cf, cueBall);
			cueBallCANb.position.set(cueBall.position.x,cueBall.position.y,cueBall.position.z);
			
		}
		if (key == 's'){
			var trans = new THREE.Vector3();
			cb_cf.decompose(trans, new THREE.Quaternion(), new THREE.Vector3());
			cueBallCANb.velocity = new CANNON.Vec3(0,0,0);
			cb_cf.copy(new THREE.Matrix4().setPosition(new THREE.Vector3(trans.x,trans.y,trans.z+1)));
			updateBall(cb_cf, cueBall);
			cueBallCANb.position.set(cueBall.position.x,cueBall.position.y,cueBall.position.z);
			
		}
		if (key == 'd'){
			var trans = new THREE.Vector3();
			cb_cf.decompose(trans, new THREE.Quaternion(), new THREE.Vector3());
			cueBallCANb.velocity = new CANNON.Vec3(0,0,0);
			cb_cf.copy(new THREE.Matrix4().setPosition(new THREE.Vector3(trans.x+1,trans.y,trans.z)));
			updateBall(cb_cf, cueBall);
			cueBallCANb.position.set(cueBall.position.x,cueBall.position.y,cueBall.position.z);
			
		}
	 });

	  document.addEventListener("keydown", function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == ' ') {
        	var d = new Date();
			cueBallStartTimer= d.getTime();
			console.log('space down');
			var force = new CANNON.Vec3(camera.position.x,camera.position.y,camera.position.z);
			var target = new CANNON.Vec3(cueBall.position.x,cueBall.position.y,cueBall.position.z);
			cueBallCANb.applyImpulse(force,target);		
        }
        
	 });

	  document.addEventListener("keyup", function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == ' ') {
        	var d = new Date();
			var n = d.getTime();
        	cueBallEnergy = n - cueBallStartTimer;
        	console.log('space up');
        }
        
	 });

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer2.render( scene, camera );		
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Rendering Loop runner						//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(f){
			f(deltaMsec/1000, nowMsec/1000)
		})
	});
