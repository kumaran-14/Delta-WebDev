const Appointment = require('../models/Appointment.js')

function validateInput(req) {
  let bool = (req.body.title && req.body.description && req.body.date &&
    req.body.starttime && req.body.endtime)
  return bool;
}

function appointmentObject(req) {
  return {
    username:req.params.user,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    year: Number(req.body.date.split('-')[0]),
    month: Number(req.body.date.split('-')[1]),
    day: Number(req.body.date.split('-')[2]),
    starttime: req.body.starttime,
    endtime: req.body.endtime,
  }
}

//rendering form
exports.createForm = (req, res) => {
  res.render('appointments/create_appointment')
}

//creating appointment and adding it to database
exports.createAppointment = (req, res) => {
  if (validateInput(req)) {
    let newAppointment = new Appointment(appointmentObject(req))
    newAppointment.save(err => {
      if (err) console.log(err);
      return res.redirect('/')
    })
  }else {
    return res.redirect('/appointments/'+ req.params.user +'/create')
  }
}

//render form for editing appointments
exports.editForm = (req, res) => {
  Appointment.findById(req.params.id, (err, appointment) => {
    if (!appointment) {
      res.redirect('/')
    }
    res.render('appointments/edit_appointment', {
      appointment: appointment
    })
  })
}

//updating appointments in database
exports.editAppointment = (req, res) => {
  if (validateInput(req)) {
    Appointment.findByIdAndUpdate(req.params.id, appointmentObject(req), (err, appointment) => {
      if (err) console.log(err);
      res.redirect('/')
    })
  }else {
    Appointment.findById(req.params.id, (err, appointment) => {
      if (!appointment) {
        res.redirect('/')
      }
      return res.render('appointments/edit_appointment', {
        appointment: appointment
      })
    })
  }
}

//deleteing appointments form database
exports.deleteAppointment = (req, res) => {
  Appointment.findByIdAndRemove(req.params.id, (err, appointment) => {
    if (err) {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Appointment not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete Appointment with id " + req.params.id
      });
    } else {
      if (!appointment) {
        return res.status(404).send({
          message: "Appointment not found with id " + req.params.id
        });
      }

      res.send('DELETED THE PROFILE')
    }
  })
}
