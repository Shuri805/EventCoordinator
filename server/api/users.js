const express = require('express');

const usersRouter = express.Router();

const {
  createUser,
  getAllUsers,
  doesUserExist,
  login,
  loginWithToken,
} = require('../db/index');

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
});

usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

// usersRouter.post('/register', async (req, res, next) => {
//   const values = {
//     name: req.body.name,
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   };

//   try {
//     for (const key in values) {
//       if (values.hasOwnProperty(key)) {
//         const value = values[key];

//         if (!value || typeof value !== 'string' || !value.trim().length) {
//           return res.status(400).json({
//             error: `${key} is required, must be a string, and cannot be empty.`,
//           });
//         } values[key] = value.trim();
//       }
//     }

//     const [exists, column] = await doesUserExist(values.username, values.email);

//     if (exists) {
//       return res.status(409).json({
//         error: `A user with this ${column} already exists.`,
//       });
//     }

//     const [user, token] = await createUser(values);

//     delete user.password;

//     console.log(user, token);

//     res.status(201).json({
//       user,
//       token,
//     });
//   } catch (error) {
//     console.error('register error', error);
//     next(error);
//   }
// });

// usersRouter.post('/login/token', async (req, res, next) => {
//   let token = '';

//   const bearerHeader = req.headers.authorization;

//   if (typeof bearerHeader !== 'undefined') {
//     token = bearerHeader.split(' ')[1];
//   } else {
//     res.status(403).json({
//       error:
//         'Token is required, and must be sent in an authorization bearer header.',
//     });
//   }

//   try {
//     const user = await loginWithToken(token);

//     if (!user) {
//       return res.status(403).json({
//         error: 'Invalid token.',
//       });
//     }

//     delete user.password;

//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// usersRouter.post('/login', async (req, res, next) => {
//   const values = {
//     password: req.body.password,
//     email: req.body.email,
//   };

//   // make sure we have valid data from the client
//   for (const key in values) {
//     // protect against keys on the prototype chain
//     if (values.hasOwnProperty(key)) {
//       const value = values[key];

//       if (!value || typeof value !== 'string' || !value.trim().length) {
//         return res.status(400).json({
//           error: `${key} is required, must be a string, and cannot be empty.`,
//         });
//       }
//       // trim all strings before insertion into db
//       values[key] = value.trim();
//     }
//   }

//   try {
//     const [exists] = await doesUserExist('', values.email);

//     if (!exists) {
//       return res.status(404).json({
//         error: 'No user with that email exists.',
//       });
//     }

//     const [user, token] = await login(values.email, values.password);

//     if (!user) {
//       return res.status(401).json({
//         error: 'Invalid password.',
//       });
//     }

//     delete user.password;

//     res.json({
//       user,
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// usersRouter.get('/allusers', async (req, res, next) => {
//   const { allUsers } = req.params;
//   try {
//     const users = await getAllUsers(allUsers);
//     res.send({
//       users,
//       message: 'successfully retrieved users',
//     });
//   } catch ({ error }) {
//     next({ error });
//   }
// });

module.exports = usersRouter;
