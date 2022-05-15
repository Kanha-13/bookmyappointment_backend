const controller = require('../controllers/appointment');
const router = require('express').Router();
const auth = require('../middlewares/is_auth')
router.route('/appointment')
  .post(auth, controller.bookAppointment)
router.route('/appointments')
  .get(auth, controller.getAppointments)
router.route('/appointment/:appId')
  .get(auth, controller.getAppointment)
  .patch(auth, controller.editAppointment)
  .delete(auth, controller.deleteAppointment)

module.exports = router