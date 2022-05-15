const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  mobileNumber: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  age: {
    type: String,
    require: true
  },
  dob: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }

})

module.exports = mongoose.model('patient', patientSchema);