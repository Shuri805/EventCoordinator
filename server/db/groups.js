/* eslint-disable comma-dangle */
const { client } = require('./client');

const createGroup = async ({ ownerId, groupName, description }) => {
  const {
    rows: [group]
  } = await client.query(
    `
    INSERT INTO groups("ownerId", "groupName", description)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [ownerId, groupName, description]
  );

  return group;
};

const getAllGroups = async () => {
  const { rows } = await client.query(
    `SELECT id, "ownerId", "groupName", description
      FROM groups;
    `
  );
  return rows;
};

const getGroupById = async (groupId) => {
  const {
    rows: [group]
  } = await client.query(
    `
      SELECT id, "ownerId", "groupName", description
      FROM groups
      WHERE id=$1;
      `,
    [groupId]
  );

  if (!group) {
    return null;
  }
  return group;
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById
};
