/* eslint-disable no-unused-vars */
const express = require('express');

const apiRouter = express.Router();

const usersRouter = require('./users');

apiRouter.use('/users', usersRouter);

apiRouter.get('/', async (req, res, next) => {
  res.send({ message: "you've reached /api" });

  next();
});

// const groupRouter = require('./group');

// router.use('/group', groupRouter);

// const eventRouter = require('./events');

// router.use('/event', eventRouter);

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
