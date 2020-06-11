const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  attention: {
    type: Boolean,
  },
  technician: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Log = mongoose.model('log', logSchema);
