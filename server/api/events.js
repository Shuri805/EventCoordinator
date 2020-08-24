/* eslint-disable no-unused-vars */
const express = require('express');

const eventsRouter = express.Router();

const { createEvent, getAllEvents } = require('../db/index');

eventsRouter.get('/', async (req, res) => {
  const events = await getAllEvents();
  res.send({ events });
});

module.exports = eventsRouter;
