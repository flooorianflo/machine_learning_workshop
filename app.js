/*// 
// INSERT INTO index.html: <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" type="text/javascript"></script>

// Teachable Machine
// Based on: The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html


// For displaying the label
let labelOutput = document.getElementById( "labelOutput" );
let label = "waiting...";

// The video from the webcam
let video;

// The classifier
let classifier;

// >>>>
// HIER MUSS DER LINK ZU EUREM MODELL REIN!!!!
let modelURL = 'https://teachablemachine.withgoogle.com/models/wuyd_Zs2K/';


// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json'); // The model is stored in a JSON file
}

function setup() {
  // Size of the canvas
  createCanvas(640, 480);

  // Circle Starts in the middle
  x = width / 2;
  y = height;
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // -> STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  // 
  background(0);

  // Draw the video
  image(video, 0, 0);


  // STEP 4: Draw the label
  labelOutput.innerHTML = label;

}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
*/

  // Global variable to store the classifier
let classifier;

// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/wuyd_Zs2K/';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}