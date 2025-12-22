import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import { FaMapMarkerAlt, FaUniversity, FaCode, FaGraduationCap, FaSpinner } from 'react-icons/fa';
import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';

// Fallback static data in case database is empty
const fallbackData = [
  {
    district: 'Namakkal District',
    colleges: [
      { name: 'K.S. Rangasamy College of Technology (KSRCT)', location: 'Tiruchengode' },
      { name: 'Paavai Engineering College / Paavai College of Technology', location: 'Namakkal' },
      { name: 'Selvam College of Technology (Autonomous)', location: 'Namakkal' },
    ]
  },
  {
    district: 'Salem District',
    colleges: [
      { name: 'Knowledge Institute of Technology (KIOT)', location: 'Salem' },
      { name: 'R. P. Sarathy Institute of Technology (RPSIT)', location: 'Salem' },
    ]
  },
  {
    district: 'Erode District',
    colleges: [
      { name: 'Shree Venkateshwara Hi-Tech Engineering College', location: 'Gobichettipalayam' },
      { name: 'Erode Sengunthar Engineering College (ESEC)', location: 'Perundurai' },
    ]
  },
  {
    district: 'Coimbatore Zone',
    colleges: [
      { name: 'Karpagam College of Engineering (Autonomous)', location: 'Coimbatore', code: '2710' },
      { name: 'Karpagam Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2735' },
    ]
  },
];

const districtColors = {
  'Namakkal District': 'from-red-500 to-red-600',
  'Salem District': 'from-green-500 to-green-600',
  'Erode District': 'from-blue-500 to-blue-600',
  'Coimbatore Zone': 'from-purple-500 to-purple-600',
};

// Use Static Site Generation with Incremental Static Regeneration for faster loading
export async function getStaticProps() {
  try {
    await dbConnect();
    
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
        _id: college._id.toString(),
        name: college.name,
        location: college.location,
        code: college.code || '',
        note: college.note || '',
      });
      return acc;
    }, {});

    // Convert to array format
    const collegesData = Object.keys(groupedColleges).map(district => ({
      district,
      colleges: groupedColleges[district],
    }));

    return {
      props: {
        collegesData: collegesData.length > 0 ? collegesData : fallbackData,
      },
      // Revalidate every 60 seconds (ISR)
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return {
      props: {
        collegesData: fallbackData,
      },
      revalidate: 60,
    };
  }
}

export default function Colleges({ collegesData }) {
  const totalColleges = collegesData.reduce((acc, district) => acc + district.colleges.length, 0);

  return (
    <Layout
      title="Colleges Available"
      description="Explore top engineering colleges in Tamil Nadu - Namakkal, Salem, Erode, and Coimbatore districts. Get expert guidance for college admissions from Rasi Foundation."
      keywords="engineering colleges Tamil Nadu, colleges in Namakkal, colleges in Salem, colleges in Erode, colleges in Coimbatore, TNEA counseling, engineering admission"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-green-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaUniversity className="text-amber-300" />
              <span className="text-sm font-medium">Partner Institutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Colleges <span className="text-amber-300">Available</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Explore {totalColleges}+ Top Engineering Colleges across Tamil Nadu
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">{collegesData.length}</span>
                <p className="text-sm">Districts</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">{totalColleges}+</span>
                <p className="text-sm">Colleges</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">100%</span>
                <p className="text-sm">Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges by District */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {collegesData.map((district, districtIndex) => (
            <div key={districtIndex} className="mb-12 last:mb-0">
              {/* District Header */}
              <div className={`bg-gradient-to-r ${districtColors[district.district] || 'from-gray-500 to-gray-600'} text-white rounded-2xl p-6 mb-6 shadow-lg`}>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-2xl" />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {district.district} – Engineering Colleges
                  </h2>
                </div>
                <p className="mt-2 text-white/80">
                  {district.colleges.length} institutions available
                </p>
              </div>

              {/* Colleges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {district.colleges.map((college, collegeIndex) => (
                  <div
                    key={college._id || collegeIndex}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${districtColors[district.district] || 'from-gray-500 to-gray-600'} text-white rounded-lg flex items-center justify-center font-bold text-sm`}>
                        {collegeIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                          <FaMapMarkerAlt className="text-xs text-red-500" />
                          <span>{college.location}</span>
                        </div>
                        {college.code && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <FaCode className="text-xs text-blue-500" />
                            <span>Code: <strong className="text-blue-600">{college.code}</strong></span>
                          </div>
                        )}
                        {college.note && (
                          <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            {college.note}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaGraduationCap className="text-5xl mx-auto mb-6 text-amber-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right College?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert counselors. We'll help you find the perfect college based on your rank, preferences, and career goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Free Counseling
            </a>
            <a
              href="tel:+919789446100"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Call: +91 97894 46100
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
