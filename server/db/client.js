const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/event-coordinator');

module.exports = {
  client,
};
