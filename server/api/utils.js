/* eslint-disable comma-dangle */
const { promisifiedVerify } = require('../db/users');

// eslint-disable-next-line max-len
/* Gets token from header and sets to req.token. Sends Forbidden(403) message if auth header is undefined. */

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;

    req.id = await promisifiedVerify(bearerToken);

    next();
  } else {
    res.sendStatus(403);
  }
}

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action'
    });
  }
}

module.exports = {
  verifyToken,
  requireUser
};
