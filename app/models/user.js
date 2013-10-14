'use strict';

var mongoose = require('mongoose')
  , crypto = require('crypto')
  , Schema = mongoose.Schema
  , hat = require('hat')
  ;


Schema.prototype.defineHashedPassword = function (algorithm, validate) {
  this.add({
    hashed_password: String, salt: String
  });

  this.virtual('password').set(function (pw) {
    this._password = pw;
    if (!this.salt) {
      this.salt = this.createSalt();
    }
    this.hashed_password = this.encryptPassword(pw);
  }).get(function () {
      return this._password;
    });

  this.methods.authenticate = function (plain) {
    return this.encryptPassword(plain) === this.hashed_password;
  };

  this.methods.createSalt = function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  };

  this.methods.encryptPassword = function (str) {
    return crypto.createHmac(algorithm, this.salt).update(str).digest('hex');
  };

};

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  isActive: { type: Boolean, default: true },
  isAdmin: {type: Boolean, default: false },
  token: { type: String, required: true, default: hat() }
});

UserSchema.defineHashedPassword('sha256', function (value) {
  if (this.isNew) {
    return value && value.length >= 6;
  } else {
    if (value) {
      return value.length >= 6;
    } else {
      return true;
    }
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User;