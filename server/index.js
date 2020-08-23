/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { client } = require('./db');
const apiRouter = require('./api');

const server = express();
const PORT = process.env.PORT || 3000;

client.connect();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, '../public')));
server.use('/api', apiRouter);

server.listen(PORT, () => console.log(chalk.redBright(`Big Brother can see you on port ${PORT}`)));

server.get('/health', (req, res, next) => {
  res.send({
    message: 'Server is healthy!',
  });
});

server.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});
