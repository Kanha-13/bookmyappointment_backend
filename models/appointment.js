const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  doctorName: {
    type: String,
    require: true
  },
  mobileNumber: {
    type: String,
    require: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: 'patients',
    require: true
  },
  appointmentDateTime: {
    type: String,
    require: true
  },
  problem: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('appointment', appointmentSchema);