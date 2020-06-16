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