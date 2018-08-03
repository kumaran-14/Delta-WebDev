// const signale = require('signale')
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config.js');

  /*importing router*/
  const defaultRouter = require('./app/routes/default-router.js');

  //initialising express
  /*const app = express();*/

  //database Connection
  /*mongoose.connect("mongodb://localhost:27017/bidapp")
  .then(()=>{
    signale.success('*****Database Connection Successfull******');
  }).catch(err=>{
    signale.fatal(new Error(err));
    signale.warn('Could not connect to Database. Exiting now...');
    process.exit();
  })
  let db = mongoose.connection*/

  // view engine setup
  /*app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');*/

  //middlewares
  /*app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));*/

  //Home Route
  /*app.get('/login',(req,res)=>{
    res.render('login')
  })*/

  /*app.use('/default', defaultRouter);*/
  /*app.post('/login',(req,res) => {
  	if( !req.body.username || !req.body.password){
  		res.redirect('/')
  	}
  		signale.debug(req.session.username)
  })*/

 /* app.listen(3000,()=> {
    signale.success('Server Started on port: 3000');
  })*/
  var WebSocketServer = require('websocket').server;
var http = require('http');
var wsServer;
var server = http.createServer(function(request, response) {
console.log((new Date()) + ' Received request for ' + request.url);
response.writeHead(404);
response.end();
});
server.listen(8080, function() {
console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
httpServer: server
 });

// listening request event
wsServer.on('request', function(request) {
 var connection = request.accept('echo-protocol', request.origin);
 console.log('Connection created at : ', new Date());

 // listening message receiving event by client
 connection.on('message', function(message) {
 if (message.type === 'utf8') {
 console.log('Received Message: ' + message.utf8Data);

 // Sending message to client
 connection.sendUTF(message.utf8Data);
 }
 else if (message.type === 'binary') {
 console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');

 // Sending message to client in binary form
 connection.sendBytes(message.binaryData);
 }
 });

 // listening for connection close event
 connection.on('close', function(reasonCode, description) {
 console.log('Peer ' + connection.remoteAddress + ' disconnected at : ', new Date());
 });
 });

