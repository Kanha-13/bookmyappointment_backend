const patient = require('../models/patient')
module.exports = {
  getPatientDetails: async (req, res) => {
    const patientId = req.patientId
    const res_data = await patient.findById(patientId)
    delete res_data.password;
    res.status(200).json(res_data)
  }
}