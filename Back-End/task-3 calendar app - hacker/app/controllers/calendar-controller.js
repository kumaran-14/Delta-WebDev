const Appointment = require('../models/Appointment.js')

//days starting with Sunday
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Months, stating on January
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function queryMonth(username, year, month) {
  return {
    username: username,
    year: year,
    month: month,
  }
}

function queryDate(username, year, month, day) {
  return {
    username: username,
    year: year,
    month: month,
    day:day,
  }
}

//for development purposes
exports.show = (req, res) => {
  res.render('calendar/calendar')
}

//rendering a calendar view
exports.displayMonth = (req, res) => {
  var d = new Date()
  // Current Date parameters
  var currMonth = d.getMonth();
  var currYear = d.getFullYear();
  var currDay = d.getDate();

  // Required Date parameters
  var m = Number(req.params.month)
  var y = Number(req.params.year)

  //First day of the week in the selected month(0-6)
  var firstDayOfMonth = new Date(y, m, 1).getDay()
  //Last date of the selected month(30 or 31)
  var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
  // Last date of the previous month(30 or 31)
  var lastDateOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

  Appointment.find(queryMonth(req.params.user, y, m + 1), (err, appointments) => {
    if (err) console.log(err);
    res.render('calendar/display_calendar', {
      monthName: months[m],
      month: m,
      year: y,
      daysOfWeek: daysOfWeek,
      lastDateOfLastMonth: lastDateOfLastMonth,
      lastDateOfMonth: lastDateOfMonth,
      currYear: currYear,
      currMonth: currMonth,
      currDay: currDay,
      appointments: appointments
    })
  })
}

//rendering all appointments for a particular day
exports.displayDate = (req, res) => {

  let m = Number(req.params.month)
  let y = Number(req.params.year)
  let d = Number(req.params.date)

  Appointment.find(queryDate(req.params.user, y, m + 1,d), (err, appointments) => {
    res.render('calendar/appointments_today', {
      appointments: appointments
    })
  })
}
