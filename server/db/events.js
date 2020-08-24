/* eslint-disable comma-dangle */
const { client } = require('./client');

const createEvent = async ({
  eventName,
  date,
  location,
  notes,
  isConfirmed,
  groupId,
  ownerId
}) => {
  const {
    rows: [event]
  } = await client.query(
    `
    INSERT INTO events(
      "eventName",
      date,
      location,
      notes,
      "isConfirmed",
      "groupId",
      "ownerId")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
    [eventName, date, location, notes, isConfirmed, groupId, ownerId]
  );

  return event;
};

const getAllEvents = async () => {
  const { rows } = await client.query(
    `SELECT id, "eventName",
      date,
      location,
      notes,
      "isConfirmed",
      "groupId",
      "ownerId"
      FROM events;
    `
  );

  return rows;
};

const getEventById = async (eventId) => {
  const {
    rows: [event]
  } = await client.query(
    `
      SELECT id, "ownerId", "eventName", description
      FROM events
      WHERE id=$1;
      `,
    [eventId]
  );

  if (!event) {
    return null;
  }
  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
};
