const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  assignedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  returnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Active', 'Returned'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
