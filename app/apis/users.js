'use strict';
var User = require('../models/user')
  , _ = require('lodash')
  ;
module.exports = function (app) {
  app.get('/api/v1/users',
    function (req, res, next) {
      User.find({}, function (err, users) {
        if (err) {
          next(err);
        } else {
          res.send(200, users);
        }
      });
    });

  app.get('/api/v1/users/:token',
    function (req, res, next) {
      User.findOne({token: req.params.token}, function (err, user) {
        if (err) {
          next(err);
        } else {
          if (!user) {
            res.send(404, "User not found.");
          } else {
            res.send(200, formatUser(user));
          }
        }
      });
    });

  app.post('/api/v1/users',
    function (req, res, next) {

      var user = new User(req.body);
      User.findOne({email: user.email.toLocaleLowerCase()}, function (err, foundUser) {
        if (err) {
          next(err);
        } else {
          if (foundUser) {
            res.send(400, "Email address already exists");
          } else {
            user.save(function (err, user) {
              if (err) {
                next(err);
              } else {
                res.send(200, formatUser(user));
              }
            });
          }
        }
      });
    });

  app.post('/api/v1/users/login',
    function (req, res, next) {
      console.log(req.body.email);
      User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
          next(err);
        } else {
          console.log(user);
          if (user && user.authenticate(req.body.password)) {
            res.send(200, formatUser(user));
          } else {
            res.send(400, "Wrong username or password");
          }
        }
      });
    });

  app.put('/api/v1/users/:id',
    function (req, res, next) {
      var user = _.omit(res.body, '_id', '__v');
      User.findByIdAndUpdate(req.params.id, user, function (err, user) {
        if (err) {
          next(err);
        } else {
          res.send(200, formatUser(user));
        }
      });
    });

  app.delete('/api/v1/users/:id',
    function (req, res, next) {
      User.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
          next(err);
        } else {
          res.send(200);
        }
      });
    });

  function formatUsers(users) {
    _.forEach(users, function (user) {
      user = formatUser(user);
    });

    return users;
  }

  function formatUser(user) {
    return _.pick(user, "firstName", "lastName", "token");
  }
}
