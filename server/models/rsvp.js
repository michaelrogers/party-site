const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Article model with the ArticleSchema
module.exports = mongoose.model(
  'rsvp',
  new Schema({
    guestName: {
      type: String,
      required: true
    },
    isAttending: {
      type: Boolean,
      required: true,
      default: null
    },
    numberAttending: {
      type: Number,
      required: true,
      min: 0,
      max: 6
    },
    notes: {
      type: String,
      required: false
    } 

  }, {timestamps: true})
);
