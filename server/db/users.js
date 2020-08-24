/* eslint-disable comma-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { client } = require('./client');

async function createUser({ username, password }) {
  const { rows } = await client.query(
    `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
    [username, password]
  );

  return rows;
}

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT id, username
    FROM users;
  `);

  return rows;
}

async function getUserById(userId) {
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1;
    `,
      [userId]
    );

    if (!user) {
      throw {
        name: 'UserNotFoundError',
        description: 'Could not find user with that userId'
      };
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const promisifiedHash = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) reject(error);
      else resolve(hash);
    });
  });

async function doesUserExist(username = '', email = '') {
  if (!username && !email) {
    throw new Error('You must provide username or email.');
  }

  if (username && username.length) {
    const usernameQuery = await client.query(
      `
        SELECT id FROM users
        WHERE username = $1;
      `,
      [username]
    );

    if (usernameQuery.rows.length > 0) {
      return [true, 'username'];
    }
  }

  if (email && email.length) {
    const emailQuery = await client.query(
      `
      SELECT id FROM users
      WHERE email = $1;
    `,
      [email]
    );

    if (emailQuery.rows.length > 0) {
      return [true, 'email'];
    }
  }

  return [false, ''];
}

const promisifiedSign = (id) =>
  new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.SECRET, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    });
  });

const promisifiedVerify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    });
  });

const login = async (username = '', password = '') => {
  if (!username || !password) {
    return [null, ''];
  }

  const {
    rows: [user]
  } = await client.query(
    `
    SELECT * FROM users
    WHERE username = $1;
  `,
    [username]
  );

  if (!(await bcrypt.compare(password, user.password))) return [null, ''];

  return [user, await promisifiedSign(user.id)];
};

const loginWithToken = async (token = '') => {
  if (!token) {
    return null;
  }

  const { id } = await promisifiedVerify(token);

  return getUserById(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  login,
  doesUserExist,
  loginWithToken,
  promisifiedVerify,
  promisifiedHash
};
