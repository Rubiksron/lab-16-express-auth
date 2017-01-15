'use strict';

let User = require('../models/user.js');
let createError = require('http-errors');

module.exports = (req, res, next) => {
  let auth = req.headers.authorization;
  console.log('here is the auth: ', auth);
  if(!auth) {
    console.error('error', err);
  }

  let base64String = auth.split('Basic')[1];
  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  console.log(username);
  console.log(password);
  User.find({username: username})
    .then(user => {
      if (user.password == password) {
        console.log('logged in');
        req.user = user;
        next();
      }
      else{
        (err => next(createError(404, 'error, user not found')));
        //LOG IN
      }
      next();
    })
    .catch((err => next(createError(404, 'error, user not found'))));
};

// let User = require('../models/user');
// let createError = require('http-errors');
//
// module.exports = (req, res, next) => {
//   let auth = req.headers.authorization;
//   console.log('this is the auth: ', auth);
//   if (!auth) {
//     console.error('no auth provided.');
//   }
// /*cannot read auth below, the split function misfire tell me so.*/
//   let base64String = auth.split('Basic')[1];
//   let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
//
//   User.findOne({username: username})
//     .then(user => {
//       console.log(user);
//       if (user.password == password) {
//         console.log(user.password);
//         console.log(password);
//         console.log('logged in');
//         next();
//       }
//       else {
//         res.json({msg: 'error, wrong password.'});
//       }
//     })
//     .catch(err => next(createError(404, 'error, user not found')));
// };
