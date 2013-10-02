"use strict";

function EpisodeServices($db) {
  this.collectionName = "episodes";
  this.$db = $db;
}

EpisodeServices.prototype.all = function (callback) {
  var self = this;
  self.$db.use(self.collectionName).document.list(callback);
};

EpisodeServices.prototype.getById = function (id, callback) {
  var self = this;
  self.$db.user(self.collectionName).document.get(id, callback);
};

EpisodeServices.prototype.query = function (predicate, callback) {
  var self = this;
  self.$db.simple.example(self.collectionName, predicate, callback);
};

EpisodeServices.prototype.save = function (entity, callback) {
  var self = this;
  self.$db.document.create(self.collectionName, entity, callback);
};

EpisodeServices.prototype.update = function (id, entity, callback) {
  var self = this;
  self.$db.document.put(id, entity, callback);
};

EpisodeServices.prototype.destroy = function (id, callback) {
  var self = this;
  self.$db.document.delete(id, callback);
};


module.exports = function $init(next) {
  this.register('EpisodeServices').as.ctor(EpisodeServices);
  next();
};