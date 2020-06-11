const mongoose = require('mongoose');
const technicianSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});
module.exports = Technician = mongoose.model('tech', technicianSchema);
