const { client } = require("./client");

async function getAllEvents() {
  try {
    const { rows } = await client.query(
      `SELECT eventName,
      date,
      location,
      notes,
      isConfirmed,
      groupId,
      ownerId
      FROM events;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createEvent({
  eventName,
  date,
  location,
  notes,
  isConfirmed,
  groupId,
  ownerId,
}) {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO events(
      eventName,
      date,
      location,
      notes,
      isConfirmed,
      groupId,
      ownerId)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
      [eventName, date, location, notes, isConfirmed, groupId, ownerId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  // updateEvent,
};
