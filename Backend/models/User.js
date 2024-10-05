const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  registrationNumber: String,
  bookedSlots: { type: [String], default: [] }, 
});

module.exports = mongoose.model('User', userSchema);
