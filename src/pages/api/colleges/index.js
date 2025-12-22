import dbConnect from '@/lib/mongodb';
import College from '@/models/College';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const colleges = await College.find({ isActive: true })
        .sort({ district: 1, order: 1, name: 1 })
        .lean();
      
      // Group colleges by district
      const groupedColleges = colleges.reduce((acc, college) => {
        const district = college.district;
        if (!acc[district]) {
          acc[district] = [];
        }
        acc[district].push({
          _id: college._id,
          name: college.name,
          location: college.location,
          code: college.code,
          note: college.note,
        });
        return acc;
      }, {});

      // Convert to array format
      const result = Object.keys(groupedColleges).map(district => ({
        district,
        colleges: groupedColleges[district],
      }));

      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
