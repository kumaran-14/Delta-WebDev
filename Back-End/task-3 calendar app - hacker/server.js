const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const config = require('./config/config.js');

//importing routers
let usersRouter = require('./app/routes/users-router.js');
let appointmentsRouter = require('./app/routes/appointments-router.js');
let invitesRouter = require('./app/routes/invites-router.js');
let calendarRouter = require('./app/routes/calendar-router.js');

//initialising express
const app = express();

//database Connection
mongoose.connect(config.mongodb.dbURI)
.then(()=>{
  console.log('*****Database Connection Successfull******');
}).catch(err=>{
  console.log(err);
  console.log('Could not connect to Database. Exiting now...');
  process.exit();
})
let db = mongoose.connection



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares for body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//middlewares for expressValidator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

//set the lookup location of static files
app.use(express.static(path.join(__dirname, 'public')));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret:config.session.secretString,
  resave:true,
  saveUninitialized:false
}))
//sessionChecker middlewares
let sessionChecker = (req,res,next) =>{
  if(!req.session.user){
    res.redirect('/user/login')
  }else{
    next()
  }
}

//global vari for all routes
app.get('*',(req,res,next) => {
  res.locals.user = req.session.user || null
  next()
})

//default route
app.get('/',(req,res) => {
  if(res.locals.user) {
    return res.redirect('/calendar/' + res.locals.user.username)
  }
  return res.redirect('/user/login')
})
//development purposes
  //secure Route
  // app.get('/secure',sessionChecker, (req,res)=>{
  //   res.render('secure')
  // })
  // testing
  // app.get('/layout',(req,res)=>{
  //   res.render('layout')
  // })

//specific routes
//for http://localhost:3000/user/
app.use('/user', usersRouter);

//for http://localhost:3000/appointments/
app.use('/appointments',sessionChecker, appointmentsRouter);

//for http://localhost:3000/invites/
app.use('/invites',sessionChecker, invitesRouter);

//for http://localhost:3000/calender/
app.use('/calendar',sessionChecker, calendarRouter);

app.get('*',(req,res)=>{
  res.send('ERROR 404. PAGE NOT FOUND')
})

app.listen(3000,()=> {
  console.log('Server Started on port: 3000');
})
