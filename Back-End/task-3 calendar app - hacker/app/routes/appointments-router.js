const router = require('express').Router();

const appointment = require('../controllers/appointment-controller.js');

//routes for /appointment
//render the appointment form
router.get('/:user/create', appointment.createForm)

//register a new appointment
router.post('/:user/create', appointment.createAppointment)

//render edit form
router.get('/:user/edit/:id', appointment.editForm)

//editing a appointemnt
router.post('/:user/edit/:id', appointment.editAppointment)

//delete Appointment
router.delete('/:user/edit/:id', appointment.deleteAppointment)


module.exports = router