import dbConnect from '@/lib/mongodb';
import { withAuth } from '@/lib/auth';
import Contact from '@/models/Contact';
import Enquiry from '@/models/Enquiry';
import Question from '@/models/Question';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get counts
    const [
      totalContacts,
      newContacts,
      totalEnquiries,
      pendingEnquiries,
      totalQuestions,
      unansweredQuestions
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'pending' }),
      Question.countDocuments(),
      Question.countDocuments({ isAnswered: false })
    ]);

    // Get recent items
    const [recentContacts, recentEnquiries] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    res.status(200).json({
      stats: {
        contacts: { total: totalContacts, new: newContacts },
        enquiries: { total: totalEnquiries, pending: pendingEnquiries },
        questions: { total: totalQuestions, unanswered: unansweredQuestions }
      },
      recent: {
        contacts: recentContacts,
        enquiries: recentEnquiries
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default withAuth(handler);
