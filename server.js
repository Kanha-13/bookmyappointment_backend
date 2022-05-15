require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const appointment = require('./routes/appointment')
const login = require('./routes/login')
const patient = require('./routes/patient')
const PORT = process.env.PORT || 1310
const URI = process.env.MONGO_URI

//configs
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to DB");
});


//middlewares
var whitelist = ['http://localhost:3000', "https://mydoctorapp-95b65.web.app", /** other domains if any */]
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json())


//api-endpoints
app.get('/', (req, res) => res.status(200).send("Server running..."))
app.use(login)
app.use(patient)
app.use(appointment)


//listener
app.listen(PORT, () => console.log(`Server listening at ${PORT}`))