var SpeechRecognition = webkitSpeechRecognition
var SpeechRecognitionEvent = webkitSpeechRecognitionEvent
var colorCommands = [ 'red' , 'blue' , 'black'];
var shapeCommands = [ 'round', 'square','rectangle'];
var navCommands = [ 'up', 'down','left','right'];

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var div = document.querySelector('.color-shape');
let listenButton = document.querySelector('#listen')

listenButton.onclick = function() {
  recognition.start();
  console.log('Speak now.');
}

recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var result = event.results[last][0].transcript;
  colorCommands.forEach( command => {
    if( command == result){
      div.style.backgroundColor = result;
      return console.log('color change')
    }
  })
  if(shapeCommands[0] == result){

    console.log(result)
    div.style.height = "100px";
    div.style.width = "100px";
    div.style.borderRadius = "50%";
  }
    if(shapeCommands[1] == result){
    console.log(result)
    div.style.borderRadius = "0px";
    div.style.height = "500px";
    div.style.width = "500px";

  }
      if(shapeCommands[2] == result){
    console.log(result)
    div.style.borderRadius = "0px";
    div.style.height = "100px";
    div.style.width = "400px";

  }
  // var navCommands = [ 'up', 'down','left','right'];

    if(navCommands[0] == result){
      var rect = div.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
      let val = parseInt(rect.top) + parseInt(-20) + "px"
      console.log(val)
      div.style.top = val
  }
  if(navCommands[1] == result){
       var rect = div.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
      let val = parseInt(rect.bottom) + parseInt(-20) + "px"
      console.log(val)
      div.style.top = val
  }
    if(navCommands[2] == result){
      var rect = div.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
      let val = parseInt(rect.left) + parseInt(-20) + "px"
      console.log(val)
      div.style.left = val
  }
    if(navCommands[3] == result){
      var rect = div.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
      let val = parseInt(rect.right) + parseInt(-20) + "px"
      console.log(val)
      div.style.left = val
  }
  diagnostic.textContent = 'Result received: ' + result + '.';
}
recognition.onspeechend = function() {
  console.log('stop')
  recognition.stop();

}
recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}