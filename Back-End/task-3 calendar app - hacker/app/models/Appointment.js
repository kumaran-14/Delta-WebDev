const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  starttime: {
    type: String,
    required: true
  },
  endtime: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('appointment', AppointmentSchema)
