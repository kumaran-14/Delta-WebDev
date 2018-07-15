const router = require('express').Router();

const calendar = require('../controllers/calendar-controller.js');

//routes for '/calendar'

//for development purposes
  //router.get('/', calendar.show)

// for /:user
router.get('/:user',(req,res) => {
  let d = new Date()
  let y = d.getFullYear()
  let m = d.getMonth()
  return res.redirect('/calendar/' + req.params.user + '/' + y + '/' + m)
})
//particular month of a year
router.get('/:user/:year/:month', calendar.displayMonth)

//particular date of a year
router.get('/:user/:year/:month/:date', calendar.displayDate)

module.exports = router
