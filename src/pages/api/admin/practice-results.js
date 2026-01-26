import dbConnect from '@/backend/lib/mongodb';
import PracticeTestResult from '@/backend/models/PracticeTestResult';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { page = 1, limit = 20, search = '' } = req.query;
            const skip = (parseInt(page) - 1) * parseInt(limit);

            let query = {};
            if (search) {
                query = {
                    $or: [
                        { studentName: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                    ]
                };
            }

            const results = await PracticeTestResult.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-answers'); // Exclude detailed answers for list view

            const total = await PracticeTestResult.countDocuments(query);

            // Calculate statistics
            const stats = await PracticeTestResult.aggregate([
                {
                    $group: {
                        _id: null,
                        totalTests: { $sum: 1 },
                        avgPercentage: { $avg: '$percentage' },
                        avgScore: { $avg: '$score' },
                        highestPercentage: { $max: '$percentage' },
                        lowestPercentage: { $min: '$percentage' },
                    }
                }
            ]);

            // Recent stats (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const recentStats = await PracticeTestResult.aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo } } },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        avgPercentage: { $avg: '$percentage' },
                    }
                }
            ]);

            res.status(200).json({
                results,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
                statistics: {
                    total: stats[0]?.totalTests || 0,
                    avgPercentage: Math.round(stats[0]?.avgPercentage || 0),
                    avgScore: Math.round((stats[0]?.avgScore || 0) * 10) / 10,
                    highestPercentage: stats[0]?.highestPercentage || 0,
                    lowestPercentage: stats[0]?.lowestPercentage || 0,
                    last7Days: {
                        count: recentStats[0]?.count || 0,
                        avgPercentage: Math.round(recentStats[0]?.avgPercentage || 0),
                    }
                }
            });
        } catch (error) {
            console.error('Get practice results error:', error);
            res.status(500).json({ message: 'Failed to fetch results' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ message: 'Result ID is required' });
            }

            await PracticeTestResult.findByIdAndDelete(id);
            res.status(200).json({ message: 'Result deleted successfully' });
        } catch (error) {
            console.error('Delete practice result error:', error);
            res.status(500).json({ message: 'Failed to delete result' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default withAuth(handler);
