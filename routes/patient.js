const controller = require('../controllers/patient');
const router = require('express').Router();
const auth = require('../middlewares/is_auth')

router.route('/patient')
  .get(auth, controller.getPatientDetails)
  // .post()
  .patch()
  .delete()

module.exports = router