const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  medications: [
    {
      medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
