/* eslint-disable global-require */
const { client } = require('./client');

module.exports = {
  client,
  ...require('./users'),
  ...require('./groups'),
  ...require('./events'),
};
