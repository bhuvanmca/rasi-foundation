import dbConnect from '@/lib/mongodb';
import { withAuth } from '@/lib/auth';
import Contact from '@/models/Contact';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
