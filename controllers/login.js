const Patient = require('../models/patient')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {
  signUp: async (req, res) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(req.body.email).toLowerCase())) {
      try {
        const data = req.body
        const patient_registered = await Patient.findOne({ email: data.email.toLowerCase() })
        if (patient_registered) {
          res.status(400).json({ message: "Patient already registered" })
        } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
          data.password = hashedPassword
          data.email = data.email.toLowerCase()
          const new_patient = new Patient(data);
          const res_data = await new_patient.save();
          const token = jwt.sign({
            email: data.email,
            patientId: res_data._id.toString(),
            date: new Date(),
          }, process.env.SECRETE_JWT_KEY, {
          });
          res.cookie(process.env.TOKEN_NAME, token, { httpOnly: true });
          res.status(201).json({ message: "Patient has been logged in" })
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }
    } else {
      res.status(400).json({ Error_message: "Enter a valid email addresss" })
    }
  },
  signIn: async (req, res) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(req.body.email).toLowerCase())) {
      const email = req.body.email.toLowerCase();
      const patient = await Patient.findOne({
        email: email.toLowerCase()
      })
      if (!patient) {
        res.status(404).json({ Error_message: "patient with this email not found" })
        return 1
      }
      const valid = await bcrypt.compare(req.body.password, patient.password);
      if (valid) {
        const token = jwt.sign({
          email: patient.email,
          patientId: patient._id.toString(),
          date: new Date(),
        }, process.env.SECRETE_JWT_KEY, {

        });
        res.cookie(process.env.TOKEN_NAME, token, { httpOnly: true });
        res.send("Ho gaya").status(200)

      }
      else {
        res.status(400).json({ Error_message: "Wrong Password" })
      }

    }
    else {
      res.status(400).json({ Error_message: "Enter a valid email addresss" })
    }
  }
}