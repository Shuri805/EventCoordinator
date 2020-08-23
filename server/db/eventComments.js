const { client } = require("./client");

async function getAllEventComments() {
  try {
    const { rows } = await client.query(
      `SELECT text, eventId, userId
      FROM event_comments;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createEventComment({ text, eventId, userId }) {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO event_comments(
      text, eventId, userId
      )
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
      [text, eventId, userId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEventComment,
  getAllEventComments
};
