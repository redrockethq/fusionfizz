"use strict";

var mongoose = require('mongoose')
  , slug = require('slug')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  ;


var EpisodeSchema = new Schema({
  title: { type: String, require: true, index: { unique: true }},
  description: String,
  notes: String,
  author: {type: ObjectId, ref: 'User'},
  tags: [String],
  duration: String,
  postedAt: { type: Date, default: new Date() },
  videoUrl: String,
  thumbnailUrl: String,
  isActive: {type: Boolean, default: true},
  links: [
    {
      kind: String,
      url: String,
      isVisible: {type: Boolean, default: true}
    }
  ],
  comments: [
    {
      user: {type: ObjectId, rel: 'User'},
      body: String,
      postedAt: { type: Date, default: new Date() }
    }
  ]
});

EpisodeSchema.virtual('slug', function () {
  return slug(this.title);
});

var Episode = mongoose.model('Episode', EpisodeSchema);

module.exports = Episode;