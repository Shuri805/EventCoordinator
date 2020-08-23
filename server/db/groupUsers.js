const { client } = require("./client");

const createGroupUser = async (groupId, userId) => {
  if (!groupId || !userId) {
    return null;
  }

  const {
    rows: [userGroup]
  } = await client.query(
    `INSERT INTO group_users(groupId, userId)
    VAUES ($1, $2) ON CONFLICT (groupId, userId) DO NOTHING
    RETURNING *;
    `
    [groupId, userId]
  )
};

const getGroupByUser = async => {
  try {
    const { rows } = client.query(`
    SELECT * FROM groups
    where "ownerId"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

const deleteGroupUser = async (groupId, userId) => {
  if(!groupId || userId) {
    return false;
  }

  await client.query(
    `
    DELETE from group_users
    WHERE groupId=$1 AND userId=$2;
    `,
    [groupId, userId]
  );
  return true;
}

module.exports = {
  createGroupUser,
  getGroupByUser,
  deleteGroupUser
};
