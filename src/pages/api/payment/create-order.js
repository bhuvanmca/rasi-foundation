import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, name, email, phone, purpose } = req.body;

  if (!amount || amount < 1) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (!name || !email || !phone || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        name,
        email,
        phone,
        purpose
      }
    };

    const order = await razorpay.orders.create(options);

    // Save payment record to database
    await dbConnect();
    await Payment.create({
      orderId: order.id,
      amount,
      name,
      email,
      phone,
      purpose,
      status: 'created'
    });

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
