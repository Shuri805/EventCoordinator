const express = require('express');

const groupsRouter = express.Router();

const { createGroup, getAllGroups } = require('../db/index');

const { requireUser } = require('./utils');

groupsRouter.get('/', async (req, res) => {
  const groups = await getAllGroups();
  res.send({ groups });
});

groupsRouter.post('/', requireUser, async (req, res, next) => {
  res.send({ message: 'under construction' });
});

// groupsRouter.post('/groups', verifyToken, async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = groupsRouter;
