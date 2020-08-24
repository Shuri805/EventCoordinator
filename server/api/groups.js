const express = require('express');

const groupsRouter = express.Router();

const { createGroup, getAllGroups } = require('../db/index');

groupsRouter.get('/', async (req, res) => {
  const groups = await getAllGroups();
  res.send({ groups });
});

// groupsRouter.post('/groups', verifyToken, async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = groupsRouter;
