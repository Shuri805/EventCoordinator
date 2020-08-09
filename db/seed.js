const {
  client,
  getAllUsers,
  createUser,
} = require('./index');

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'berti99' });
    const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
    const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });

    console.log(albert, sandra, glamgal);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
  }
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...")

    await client.query(`
    DROP TABLE IF EXISTS invitiation;
    DROP TABLE IF EXISTS event_attendees;
    DROP TABLE IF EXISTS group_members;
    DROP TABLE IF EXISTS event_comment;
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS groups;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!")
  } catch (error) {
    console.log("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE groups (
      id SERIAL PRIMARY KEY,
      "ownerId" INTEGER REFERENCES users(id),
      "groupName" VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      "eventName" VARCHAR(255) UNIQUE NOT NULL,
      date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      notes VARCHAR(255),
      "isConfirmed" BOOLEAN NOT NULL,
      "groupId" INTEGER REFERENCES groups(id),
      "ownerId" INTEGER REFERENCES users(id)
    );

    CREATE TABLE event_comment (
      id SERIAL PRIMARY KEY,
      text TEXT,
      "eventId" INTEGER REFERENCES events(id),
      "userId" INTEGER REFERENCES users(id)
    );

    CREATE TABLE event_attendees (
      id SERIAL PRIMARY KEY,
      "eventId" INTEGER REFERENCES events(id),
      "userId" INTEGER REFERENCES users(id)
    );

    CREATE TABLE invitiation (
      id SERIAL PRIMARY KEY,
      accepted BOOLEAN NOT NULL,
      "inviterId" INTEGER references users(id),
      "invitedId" INTEGER references users(id),
      "groupId" INTEGER references groups(id)
    );

    CREATE TABLE group_members (
      id SERIAL PRIMARY KEY,
      "groupId" INTEGER REFERENCES groups(id),
      "userId" INTEGER REFERENCES users(id)
    )
    `);

    console.log("Finished creating tables!");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();

  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(()=> client.end());
