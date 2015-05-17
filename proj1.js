
	// detect WebGL
	if( !Detector.webgl ){
		Detector.addGetWebGLMessage();
		throw 'WebGL Not Available'
	} 
	// setup webgl renderer full page
	var renderer	= new THREE.WebGLRenderer();
    var gbox = document.getElementById('graphicsbox1');
     var gboxWidth = $("#graphicsbox1").width();
     console.log(gboxWidth);
     var CANVAS_WIDTH = gboxWidth, CANVAS_HEIGHT = gboxWidth * (9/16);
	renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    var pauseAnim = false;
    //document.body.appendChild(gbox);
	gbox.appendChild( renderer.domElement );

	// setup a scene and camera
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
    camera.up.set(0,1,0); //y is up
    camera.position.y = 45;
	camera.position.z = 45;

	// declare the rendering loop
	var onRenderFcts= [];

	// handle window resize events
	var winResize	= new THREEx.WindowResize(renderer, camera)

	//////////////////////////////////////////////////////////////////////////////////
	//		default 3 points lightning					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var ambientLight= new THREE.AmbientLight( 0x202020 )
	scene.add( ambientLight)
	var frontLight	= new THREE.DirectionalLight(0xffffff, 1);
	frontLight.position.set(10, 35, 0.0)
	scene.add( frontLight )
    //scene.add ( new THREE.DirectionalLightHelper (frontLight, 1));
	scene.add(frontLight);
	var backLight	= new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight.castShadow = true;
	backLight.position.set(-4, 20, 10)
	scene.add( backLight )
    //scene.add ( new THREE.SpotLightHelper (backLight, 0.2));
	 var path = "textures/MAK/"
    /* The image names can be ANYTHING, but the the order of the SIX images
       in the array will be used as follows:
       the 1st image => Positive X axis
       the 2nd image => Negative X axis
       the 3rh image => Positive Y axis
       the 4th image => Negative Y axis
       the 5th image => Positive Z axis
       the 6th image => Negative Z axis
     */

    var images = [path + "posx.png", path + "negx.png",
        path + "posy.png", path + "negy.png",
        path + "posz.png", path + "negz.png"];

    var cubemap = THREE.ImageUtils.loadTextureCube( images );
	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////	
 
    var bSize = 2.5;

    /* static instantiation */
    var cradle = new CradleFrame(5);
    
    var ball2 = new NewtBall(bSize, cubemap);
    var ball3 = new NewtBall(bSize, cubemap);
    var ball4 = new NewtBall(bSize, cubemap);
    
	var length = 13.46;
    var angle = -0.38;

    var string2 = new Wires(length,5.2,angle,.0625);
	var string3 = new Wires(length,5.2,angle,.0625);
	var string4 = new Wires(length,5.2,angle,.0625);

    /* know how much to move the wire group back up
    *   It has to be a function of length and angle */
    var t = (length/2) * Math.cos(angle);

    /* static positioning */
    ball2.position.y = bSize + 1;
    ball3.position.y = bSize + 1;
    ball4.position.y = bSize + 1;

    ball2.position.z = bSize*2;
    ball3.position.z = 0;
    ball4.position.z = -bSize*2;
    
    string2.position.y = (bSize*4) + t;
    string3.position.y = (bSize*4) + t;
    string4.position.y = (bSize*4) + t;
    
    string2.position.z = bSize * 2;
    string3.position.z = 0;
    string4.position.z = -bSize * 2;
        	
    /* dynamic instantiation */
    var string1_cf = new THREE.Matrix4();
    var rotation1_cf = new THREE.Matrix4();
	var string5_cf = new THREE.Matrix4();
    var rotation2_cf = new THREE.Matrix4();
    //rotation1_cf.makeTranslation(0,bSize*4 + (14-bSize*4),bSize*4);
    string1_cf.makeTranslation(0,bSize*4 + t,bSize*4);
    var string1 = new Wires(13.46,5.2,-.38,.0625);
	string5_cf.makeTranslation(0,bSize*4 + t,-bSize*4);
    var string5 = new Wires(13.46,5.2,-.38,.0625);
 //    var string5_cf = new THREE.Matrix4();
	// var string5 = new Wires(13.46,5.2,-.38,.0625);
	
    var ball1_cf = new THREE.Matrix4();
    ball1_cf.makeTranslation(0,-bSize*3 - 6.4 + 1,0);
    var ball1 = new NewtBall(bSize, cubemap);
	var ball5_cf = new THREE.Matrix4();
    ball5_cf.makeTranslation(0,-bSize*3 - 6.4 + 1,0);
    var ball5 = new NewtBall(bSize, cubemap);
    // var ball5_cf = new THREE.Matrix4();
    // var ball5 = new Ball(bSize, cubemap);

    /* dynamic positioning and scene additions */
    string1.add(ball1);
	string5.add(ball5);
    cradle.add(string1);
	cradle.add(string5);
    scene.add(cradle);

    //scene.add(ball5);
    
    /* static scene additions */
    

    scene.add(string2);
    scene.add(string3);
    scene.add(string4);

    scene.add(ball2);
	scene.add(ball3);
	scene.add(ball4);
	
    	
    scene.add (new THREE.AxisHelper(4));

    /* Load the first texture image */
    var wood_text = THREE.ImageUtils.loadTexture("textures/wood256.jpg");
    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */
    wood_text.repeat.set(4,4);
    wood_text.wrapS = THREE.RepeatWrapping;
    wood_text.wrapT = THREE.RepeatWrapping;

    // /* Load the second texture image */
    // var wood_tex = THREE.ImageUtils.loadTexture("textures/wood256.jpg");

    //  mirror repeat the texture 2 times, without
    //  * mirror repeat the seam between the left
    //  * and right edge of the texture will be
    //  * visible 
    // wood_tex.repeat.set(2,2);
    // wood_tex.wrapS = THREE.MirroredRepeatWrapping;
    // wood_tex.wrapT = THREE.MirroredRepeatWrapping;
    var groundPlane = new THREE.PlaneBufferGeometry(40, 40, 10, 10);
    /* attach the texture as the "map" property of the material */
    var groundMat = new THREE.MeshPhongMaterial({color:0xffffff, ambient:0x1d6438, map:wood_text});
    var ground = new THREE.Mesh (groundPlane, groundMat);
    ground.rotateX(THREE.Math.degToRad(-90));
    scene.add (ground);

    camera.lookAt(new THREE.Vector3(0, 5, 0));
//    mesh.matrixAutoUpdate = false;
	var prev_angle1 = 0;
	var prev_angle2 = 0;
	var turn = true;
	onRenderFcts.push(function(delta, now){
        if (pauseAnim) return;
        var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var rot = new THREE.Quaternion();
        var vscale = new THREE.Vector3();

        ball1_cf.multiply(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(delta * 72)));
        ball1_cf.decompose(tran, quat, vscale);
        ball1.position.copy(tran);
        ball1.quaternion.copy(quat);

		ball5_cf.multiply(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(delta * 72)));
        ball5_cf.decompose(tran, quat, vscale);
        ball5.position.copy(tran);
        ball5.quaternion.copy(quat);

        //string1_cf.decompose (tran, quat, vscale);
//        rot.setFromAxisAngle( new THREE.Vector3(0,0,1), THREE.Math.degToRad(arm_angle));
        //string1.position.copy(tran);
        //string1.quaternion.copy(quat);

    //   var curr_angle = (Math.PI / 4 )* Math.cos(step);
    //   step += 1;
    //   step = step % 10000;
       //var prev_angle =  (Math.PI / 4 )* Math.cos(step - .0001);
        var curr_angle1 = (Math.PI / 4 ) * Math.cos(now);
		var curr_angle2 = (Math.PI / 4 ) * Math.cos(now);
		if (curr_angle1 > 0)
		{
			curr_angle1 = 0;
			turn = false;
		}
		if(curr_angle2 < 0)
		{
			curr_angle2 = 0;
			turn = true;
		}
		if(turn == true){
        string1_cf.multiply(new THREE.Matrix4().makeRotationX((curr_angle1 - prev_angle1)));
        //rotation1_cf.multiply(string1_cf);
        string1_cf.decompose (tran, quat, vscale);
        string1.position.copy(tran);
        string1.quaternion.copy(quat);
		}
		if(turn == false){
		 string5_cf.multiply(new THREE.Matrix4().makeRotationX((curr_angle2 - prev_angle2)));
        //rotation1_cf.multiply(string1_cf);
        string5_cf.decompose (tran, quat, vscale);
        string5.position.copy(tran);
        string5.quaternion.copy(quat);
		}
		prev_angle1 = curr_angle1;
		prev_angle2 = curr_angle2;	
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var mouse	= {x : 0, y : 0};
    var prev_c = {x : 0, y : 0, z : 0};
    var new_c = {x : 0, y : 0, z : 0};
    var angle = 30.0;
	var prev_x, cur_x, prev_y, cur_y;
	var posCounter = 0;
	
	document.addEventListener('mousemove', function(event){
		mouse.x	= ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width )* 2 - 1 ; 
		mouse.y	= 1 - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height);
		cur_x = mouse.x;
		cur_y = mouse.y;
		
	}, false);

    document.addEventListener('keypress', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'p') {
            pauseAnim ^= true; /* toggle it */
        }
		
        if (key == 'l'){
			if(posCounter > 3)
			{
				posCounter = 0;
			}
			switch(posCounter){
			case 0:
				camera.position.x = 45;
				camera.position.z = 0;
				break;
			case 1:
				camera.position.x = 0;
				camera.position.z = -45;
				break;
			case 2:
				camera.position.x = -45;
				camera.position.z = 0;
				break;
			case 3:
				camera.position.x = 0;
				camera.position.z = 45;
				break;
			}
			posCounter++;
        }

    }, false);

	onRenderFcts.push(function(delta, now){
		// prev.x = camera.position.x;
  //       prev.y = camera.position.y;
  //       prev.z = camera.position.z;

  //       camera.position.x = new_c.x;
  //       camera.position.y = new_c.y;
  //       camera.position.z = new_c.z;

        camera.position.x += (mouse.x*30 - camera.position.x) * (delta*3);
		camera.position.y += (mouse.y*30 - camera.position.y) * (delta*3);
		camera.lookAt( scene.position )

	});

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
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
			f(deltaMsec/1000, nowMsec/1000);
		});
	});

