var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
// const path = require('path');
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

var amountprice,biduser
var timeLeft, timerId;

app.get('/', function(req, res) {
    res.render('login');
});

app.post('/',(req,res) => {

	  res.render('index',{
  	name:req.body.username,
  });
	  	if(timeLeft == 0){
		console.log('haahah')
  	io.emit('priceupdate',({
    	price:amountprice,
    	name:biduser,
    	secs: '0',
    }))
	}
})
app.post('/bid', function(req, res) {
/*	io.emit('priceupdate', {price:req.body.price,
		name:req.body.username,
		secs:
	});*/
	doEveryThing(req.body.price,req.body.username)
	res.send(`User Name: ${req.body.username}`)
});

io.on('connection', function(socket) {
    console.log('A new WebSocket connection has been established');
});

// setInterval(function() {
//   var stockprice = Math.floor(Math.random() * 1000);
//   io.emit('stock price update', stockprice);
// }, 1000);
/*var timeLeft = 30;

var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
  } else {
    elem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}*/

http.listen(8000, function() {
    console.log('Listening on port:8000');
});


function doEveryThing(price,name){
	if(timerId){
		clearTimeout(timerId);
	}

	timeLeft = 10;
	timerId = setInterval(countdown, 1000);
	amountprice = price;
	biduser = name;
	function countdown() {
	  if (timeLeft == 0) {
	    clearTimeout(timerId);
	    // amountprice = price
	    io.emit('priceupdate',({
	    	price:price,
	    	name:name,
	    	secs: '0',
	    }))
	  } else {
	    io.emit('priceupdate',({
	    	price:price,
	    	name:name,
	    	secs: `${timeLeft} secs remaining`,
	    }))
	    // amountprice = null
	    timeLeft--;
		}
	}
}