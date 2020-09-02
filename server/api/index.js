/* eslint-disable no-unused-vars */
const express = require('express');

const jwt = require('jsonwebtoken');

const { getUserById } = require('../db');

const { JWT_SECRET } = process.env;

const apiRouter = express.Router();

const usersRouter = require('./users');

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use('/users', usersRouter);

apiRouter.get('/', async (req, res, next) => {
  res.send({ message: "you've reached /api" });

  next();
});

const groupsRouter = require('./groups');

apiRouter.use('/groups', groupsRouter);

const eventsRouter = require('./events');

apiRouter.use('/events', eventsRouter);

// const groupEventsRouter = require('./groupEvents');

// router.use('/groupEvents', groupEventsRouter);

// const invitationsRouter = require('./invitations');

// router.use('/invitations', invitationsRouter);

// const eventCommentsRouter = require('./eventComments');

// router.use('/eventComments', eventCommentsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
