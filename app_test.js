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


  //Server Funktionalität
  // Verbindung zum WebSocket-Server
  let socket = io("https://gt1-workshop2-chat.herokuapp.com");
        
  // Save username
  let _userName = "";

  let userNameContainer = document.getElementById('userNameContainer');
  let userNameForm = document.getElementById('userNameForm');
  let userNameInput = document.getElementById('userNameInput');
  let form = document.getElementById('form');
  let input = document.getElementById('input');
  let messages = document.getElementById('messages');

  // Set username
  userNameForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (userNameInput.value) {
          _userName = userNameInput.value;
          userNameContainer.innerHTML = "<h2>I am " + _userName + "</h2>"
      }
  });

  // Send messages
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (input.value) {
          // Send message to server
          socket.emit('message', {userName: _userName, message: input.value});
          // Reset input field
          input.value = '';
      }
  });

  // Receive messages from all connected clients
  // chatMessage = {userName: _, message: _}
  socket.on("message", ( chatMessage ) => {
      
      console.log("Message from " + chatMessage.userName + ": " + chatMessage.message);
      
      // Display messages
      var item = document.createElement('li');
      item.textContent = chatMessage.userName + ": " + chatMessage.message;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  });