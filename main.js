const audio = document.querySelector('audio');
const canvas = document.querySelector('#visualization');
const ctx = canvas.getContext('2d');
// const demoAudioButton = document.querySelector('#demo-audio-btn');
// const uploadButton = document.querySelector('#uploadButton');

// Add an event listener to the demo audio button



// demoAudioButton.addEventListener('click', function() {
//   // Load the demo audio file
//   const demoAudioUrl = new Audio('testaudio.mp3');

//   // Generate a visualization for the demo audio
//   generateVisualization(demoAudioUrl);
// });

// demoAudioBtn.addEventListener('click', function() {
//   audio.src = 'testaudio.mp3';
//   generateVisualization(audio);
// });


// uploadButton.addEventListener('change', function() {

//   const uploadedFile = this.files[0];
//   const uploadedFileUrl = URL.createObjectURL(uploadedFile);

//   generateVisualization(uploadedFileUrl);
//   console.log("yes");
// })

// uploadBtn.addEventListener('change', function() {
//   const file = this.files[0];
//   const fileURL = URL.createObjectURL(file);
//   audio.src = fileURL;
//   generateVisualization(audio);
// });




function generateVisualization() {
  // const colorSelector = document.querySelector('#color-selector');
  const shapeSelector = document.querySelector('#shape-selector');
  
  const audioData = new Uint8Array(256);
  
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  
  
  const audioContext = new AudioContext();
  const src = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();
  src.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 512;
  
  audio.play();
  
  const image = new Image();

  if (shapeSelector.value === 'hand') {
    image.src = 'hand.png';
  } else if (shapeSelector.value === 'bird') {
    image.src = 'bird3.png';
  } else if (shapeSelector.value == 'circle') {
    image.src = 'circle.png';
  } else if (shapeSelector.value == 'broken heart') {
    image.src = 'brokenheart.png'
  } else if (shapeSelector.value == 'star') {
    image.src = 'star.png'
  }
  

  function updateVisualization() {
    animationId = requestAnimationFrame(updateVisualization);
    analyser.getByteFrequencyData(audioData);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = colorSelector.value;

    for (let i = 0; i < audioData.length; i++) {
      const value = audioData[i];
      const x = i / audioData.length * canvas.width;
      const y = canvas.height - (value / 256) * canvas.height;
      
      ctx.drawImage(image, x, y, image.width, image.height);
    }
    
  }
  
  image.onload = updateVisualization;
}


function previewFile() {
  var preview = document.querySelector('audio');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function () {
  preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}



// Call the generateVisualization function when the audio is loaded
audio.addEventListener('loadedmetadata', generateVisualization);

// Stop the visualization loop when the audio ends
audio.addEventListener('ended', () => cancelAnimationFrame(animationId));

