const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.headers?.cookie?.split("=")
    if (cookie === undefined || !cookie.length) {
      const error = new Error('Not Authenticated');
      error.statusCode = 401;
      res.status(401).json({ error: error })
    }
    const token = cookie[1];

    let decodedToken;
    decodedToken = jwt.verify(token, process.env.SECRETE_JWT_KEY);

    if (!decodedToken) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      res.status(401).json({ error: error })
      throw error;
    }
    req.patientId = decodedToken.patientId
    next();
  } catch (err) {
    console.log(err)
    err.statusCode = 600;
    res.status(401).json({ error: err })
    throw err;
  }
};