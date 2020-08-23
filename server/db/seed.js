/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { client, getAllUsers } = require('./index');

async function dropTables() {
  try {
    console.log('Starting to drop tables...');

    await client.query(`
    DROP TABLE IF EXISTS event_comments;
    DROP TABLE IF EXISTS user_groups;
    DROP TABLE IF EXISTS group_users;
    DROP TABLE IF EXISTS event_attendees;
    DROP TABLE IF EXISTS invitations;
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS groups;
    DROP TABLE IF EXISTS users;
    `);

    console.log('Done dropping tables!');
  } catch (error) {
    console.log('Error dropping tables!');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to create tables...');

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE groups (
      id SERIAL PRIMARY KEY,
      "ownerId" INTEGER REFERENCES users(id),
      "groupName" VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL
    );
`);

    await client.query(`
    CREATE TABLE invitations (
      id SERIAL PRIMARY KEY,
      accepted BOOLEAN NOT NULL,
      "inviterId" INTEGER references users(id),
      "invitedId" INTEGER references users(id),
      "groupId" INTEGER references groups(id)
    );
`);

    await client.query(`
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      "eventName" VARCHAR(255) UNIQUE NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location VARCHAR(255) NOT NULL,
      notes VARCHAR(255),
      "isConfirmed" BOOLEAN NOT NULL,
      "groupId" INTEGER REFERENCES groups(id),
      "ownerId" INTEGER REFERENCES users(id)
    );
`);

    await client.query(`
    CREATE TABLE event_comments (
      id SERIAL PRIMARY KEY,
      text TEXT,
      "eventId" INTEGER REFERENCES events(id),
      "userId" INTEGER REFERENCES users(id)
    );
`);

    await client.query(`
    CREATE TABLE event_attendees (
      id SERIAL PRIMARY KEY,
      "eventId" INTEGER REFERENCES events(id),
      "userId" INTEGER REFERENCES users(id)
    );
`);

    await client.query(`
    CREATE TABLE group_users (
      id SERIAL PRIMARY KEY,
      "groupId" INTEGER REFERENCES groups(id),
      "userId" INTEGER REFERENCES users(id)
    );
`);

    await client.query(`
    CREATE TABLE user_groups (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "groupId" INTEGER REFERENCES groups(id)
    );
  `);

    console.log('Finished creating tables!');
  } catch (error) {
    console.log('error creating tables');
    throw error;
  }
}

async function rebuildDB() {
  client.connect();

  await dropTables();
  await createTables();
}

async function testDB() {
  try {
    console.log('Starting to test database...');

    // const users = await getAllUsers();
    // console.log('getAllUsers:', users);

    console.log('Finished database tests!');
  } catch (error) {
    console.error('Error testing database!');
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
