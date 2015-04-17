'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  name: String,
  route: String,
  menu: Boolean,
  contents: [{
    row: Number,
    col: Number,
    size: Number,
    body: String
  }]
});

module.exports = mongoose.model('Page', PageSchema);
