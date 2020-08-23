const { client } = require("./client");

async function getAllInvites() {
  try {
    const { rows } = await client.query(
      `SELECT
      accepted,
      "inviterId,
      "invitedId,
      groupId,
      FROM invitations;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createInvite({ accepted, inviterId, invitedId, groupId }) {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO invitations(
      accepted,
      inviterId,
      invitedId,
      groupId)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [accepted, inviterId, invitedId, groupId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInvite,
  getAllInvites,
};
