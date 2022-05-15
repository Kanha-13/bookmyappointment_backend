const controller = require('../controllers/login');
const router = require('express').Router();

router.route('/patient/signUp')
  .post(controller.signUp)
router.route('/patient/signIn')
  .post(controller.signIn)
router.route('/patient/logout')
  .get((req, res) => {
    res.clearCookie('merePadhChinn'); res.status(200).send("done")
  })

module.exports = router