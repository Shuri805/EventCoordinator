const express = require('express');

const groupsRouter = express.Router();

const { createGroup, getAllGroups } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    res.json(await getAllGroups());
  } catch (error) {
    next(error);
  }
});

router.post('/groups', verifyToken, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = groupsRouter;
