/* eslint-disable no-unused-vars */
const express = require('express');

const apiRouter = express.Router();

const usersRouter = require('./users');

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
