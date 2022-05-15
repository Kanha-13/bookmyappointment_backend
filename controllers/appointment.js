const res = require('express/lib/response')
const appointment = require('../models/appointment')
const patient = require('../models/patient')
module.exports = {
  getAppointments: async (req, res) => {
    const patientId = req.patientId;
    try {
      await appointment.find({ patientId: patientId }).then(linked_datas => {
        const resulted_array = Promise.all(linked_datas.map(async app_data => {
          const patientdata = await patient.findById(app_data.patientId)
          const res_data = { app_data, patient: patientdata }
          return res_data
        }))
        resulted_array.then(data => {
          res.status(200).json(data)
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  bookAppointment: async (req, res) => {
    const data = req.body
    data.patientId = req.patientId
    const new_data = new appointment(data)
    try {
      await new_data.save()
      res.status(201).json({ message: "Appointment booked successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server error" })
    }
  },
  getAppointment: async (req, res) => {
    const appId = req.params.appId;
    try {
      const resp = await appointment.findById(appId);
      console.log(resp)
      res.status(200).json(resp);
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }

  },
  editAppointment: async (req, res) => {
    // const patientId=req.patientId
    const appId = req.params.appId;
    const update = req.body
    console.log(update)
    const res_data = await appointment.updateOne({ _id: appId }, update)
    res.status(201).json({ message: "appointment updated" })
  },
  deleteAppointment: async (req, res) => {
    // const patientId=req.patientId
    const appId = req.params.appId;
    const res_data = await appointment.deleteOne({ _id: appId })
    res.status(201).json({ message: "appointment deleted" })

  }
}