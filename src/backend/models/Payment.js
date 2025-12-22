import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: {
    type: String,
    default: null
  },
  signature: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed', 'refunded'],
    default: 'created'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paidAt: {
    type: Date,
    default: null
  }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
