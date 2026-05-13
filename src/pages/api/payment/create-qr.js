import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, purpose, description } = req.body;

  if (!amount || amount < 1) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  try {
    const qr = await razorpay.qrCode.create({
      type: 'upi_qr',
      name: 'RASI Foundation',
      usage: 'single_use',
      fixed_amount: true,
      payment_amount: Math.round(amount * 100), // convert to paise
      description: description || purpose || 'Payment',
      close_by: Math.floor(Date.now() / 1000) + 30 * 60, // expires in 30 min
    });

    return res.status(200).json({
      qrId: qr.id,
      qrImageUrl: qr.image_url,
    });
  } catch (err) {
    console.error('QR creation error:', err);
    return res.status(500).json({ error: 'Failed to generate QR code' });
  }
}
