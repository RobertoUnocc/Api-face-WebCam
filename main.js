const video= document.getElementById('video');

function startVideo() {
	// est es diferente para cada navegador asi que ponemos para todos los navegadores
	navigator.getUserMedia= (navigator.getUserMedia || 
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);


	// Recuperar informacion de la cámara web
	navigator.getUserMedia(
		{ video : {} },
		stream => video.srcObject = stream,
		err => console.log(err)
		)

}

// navigator.getUserMedia( ,nos devuelve el stream de video que vamos a capturar y se lo enviamos a src de video, aca vemos los errore)

// startVideo();


Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
	faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
	faceapi.nets.faceExpressionNet.loadFromUri('./models'),
	faceapi.nets.ageGenderNet.loadFromUri('./models')
	]).then(startVideo)
// Abrir la webCam cuando se reconoce a todos los modelos

// faceapi.nets.tinyFaceDetector.loadFromUri('/models') =>Detectar las caras
// faceLandmark68Net => PAra reconocimiento de las caras


video.addEventListener('play',async () =>{

	const canvas=faceapi.createCanvasFromMedia(video);
	document.body.append(canvas);
	// dibujamos el objeto
	const displaySize = {width:video.width, height:video.height};
	// El video tendria el canvas poe encima con el mismo tamaño
	faceapi.matchDimensions(canvas,displaySize);

	setInterval( async()=>{
		const detections = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions());
		// console.log(detections);
		
		// ahora redireccionamos el tamaño del Canvas
		const resizedDetections=await faceapi.resizeResults(detections,displaySize);

		// limpiar
		canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
		// Pintamos
		faceapi.draw.drawDetections(canvas,resizedDetections);
		
	},100)

});

// const detections = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).widthFaceLandmarks();
// faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);