(function exampleCode() {
	"use strict";

	brfv4Example.initCurrentExample = function(brfManager, resolution) {

		// By default everything necessary for a single face tracking app
		// is set up for you in brfManager.init. There is actually no
		// need to configure much more for a jump start.

		brfManager.init(resolution, resolution, brfv4Example.appId);
	};

	let perXInitial = null;
	let perYInitial = null;
	let perZInitial = null;
	let rotXInitial = null;
	let rotYInitial = null;
	let cameraXPosInitial = camera.position.x;
	let cameraYPosInitial = camera.position.y;
	let cameraZPosInitial = camera.position.z;
	let cameraXRotInitial = camera.rotation.x;
	let cameraYRotInitial = camera.rotation.y;
	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		// In a webcam example imageData is the mirrored webcam video feed.
		// In an image example imageData is the (not mirrored) image content.

		brfManager.update(imageData);

		// Drawing the results:

		draw.clear();

		// Face detection results: a rough rectangle used to start the face tracking.

		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
		draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		// Get all faces. The default setup only tracks one face.

		var faces = brfManager.getFaces();

		for(var i = 0; i < faces.length; i++) {

			var face = faces[i];

			if(		face.state === brfv4.BRFState.FACE_TRACKING_START ||
					face.state === brfv4.BRFState.FACE_TRACKING) {

				// Face tracking results: 68 facial feature points.

				draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, 0x00a0ff, 0.4);
				draw.drawVertices(	face.vertices, 2.0, false, 0x00a0ff, 0.4);

				window.perX = face.translationX;
				window.perY = face.translationY;
				window.perZ = face.scale;

				window.rotX = face.rotationX;
				window.rotY = face.rotationY;


				if(!perXInitial){
					perXInitial = perX
				}
				if(!perYInitial){
					perYInitial = perY
				}
				if(!perZInitial){
					perZInitial = perZ;
				}
				if(!rotXInitial){
					rotXInitial = rotX;
				}
				if(!rotYInitial){
					rotYInitial = rotY;
				}

				let perXDif = ((perXInitial - perX) / 100) / 4;
				camera.position.x = cameraXPosInitial - perXDif;

				let perYDif = ((perYInitial - perY) / 100) / 4;
				camera.position.y = cameraYPosInitial + perYDif;

				let perZDif = ((perZInitial - perZ) / 100) / 3;
				camera.position.z = cameraZPosInitial + perZDif;

				let rotXDif = (rotXInitial - rotX) / 3;
				camera.rotation.x = cameraXRotInitial + rotXDif;

				let rotYDif = (rotYInitial - rotY) / 3;
				camera.rotation.y = cameraYRotInitial - rotYDif;

				// console.log(`(${perX}, ${perY}, ${perZ})`);
				// camera.position.set(perX, perY, perZ);

			}
		}
	};

	brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - track single face\n" +
		"Detect and track one face and draw the 68 facial landmarks.");

	brfv4Example.dom.updateCodeSnippet(exampleCode + "");
})();
