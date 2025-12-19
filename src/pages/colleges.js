import Layout from '../components/Layout';
import { FaMapMarkerAlt, FaUniversity, FaCode, FaGraduationCap } from 'react-icons/fa';

const collegesData = [
  {
    district: 'Namakkal District',
    icon: '📍',
    color: 'from-red-500 to-red-600',
    colleges: [
      { name: 'K.S. Rangasamy College of Technology (KSRCT)', location: 'Tiruchengode' },
      { name: 'Paavai Engineering College / Paavai College of Technology', location: 'Namakkal' },
      { name: 'Selvam College of Technology (Autonomous)', location: 'Namakkal' },
      { name: 'CMS College of Engineering', location: 'Namakkal' },
      { name: 'Gnanamani College of Technology', location: 'Namakkal' },
      { name: 'Muthayammal Engineering College', location: 'Rasipuram' },
      { name: 'Sengunthar Engineering College (Autonomous)', location: 'Tiruchengode' },
      { name: 'Mahendra Engineering College', location: 'Mallasamudram' },
      { name: 'Excel College of Engineering and Technology', location: 'Komarapalayam' },
      { name: 'J.K.K. Nattraja College of Engineering and Technology', location: 'Komarapalayam' },
      { name: 'PGP College of Engineering and Technology', location: 'Namakkal' },
      { name: 'Vidhya Vikas College of Engineering and Technology', location: 'Tiruchengode' },
      { name: 'SSM College of Engineering', location: 'Komarapalayam' },
      { name: 'Annai Mathammal Sheela Engineering College', location: 'Erumapatti' },
      { name: 'S.R.G. Engineering College', location: 'Namakkal' },
    ]
  },
  {
    district: 'Salem District',
    icon: '📍',
    color: 'from-green-500 to-green-600',
    colleges: [
      { name: 'Knowledge Institute of Technology (KIOT)', location: 'Salem' },
      { name: 'R. P. Sarathy Institute of Technology (RPSIT)', location: 'Salem' },
      { name: 'Mahendra College of Engineering', location: 'Salem' },
      { name: 'Sri Ganesh Engineering College', location: 'Salem' },
      { name: 'AVS Engineering College', location: 'Salem' },
      { name: 'AVS College of Technology', location: 'Salem' },
      { name: 'Vinayaka Missions University', location: 'Salem' },
      { name: 'Annapoorana Medical College and Hospital', location: 'Salem' },
      { name: 'Sri Shanmugha College of Engineering and Technology', location: 'Salem' },
    ]
  },
  {
    district: 'Erode District',
    icon: '📍',
    color: 'from-blue-500 to-blue-600',
    colleges: [
      { name: 'Shree Venkateshwara Hi-Tech Engineering College', location: 'Gobichettipalayam' },
      { name: 'Erode Sengunthar Engineering College (ESEC)', location: 'Perundurai' },
      { name: 'J.K.K. Munirajah College of Technology', location: 'Gobichettipalayam' },
      { name: 'M. P. Nachimuthu M. Jaganathan Engineering College (MPNMJ)', location: 'Chennimalai' },
      { name: 'Nandha College of Technology', location: 'Erode' },
      { name: 'Nandha Engineering College', location: 'Perundurai' },
      { name: 'Surya Engineering College', location: 'Erode' },
      { name: 'Sasurie College of Engineering', location: 'Vijayamangalam' },
      { name: 'Al-Ameen Engineering College', location: 'Erode' },
      { name: 'Aishwarya College of Engineering & Technology', location: 'Erode' },
    ]
  },
  {
    district: 'Coimbatore Zone',
    icon: '📍',
    color: 'from-purple-500 to-purple-600',
    colleges: [
      { name: 'Karpagam College of Engineering (Autonomous)', location: 'Coimbatore', code: '2710' },
      { name: 'Karpagam Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2735' },
      { name: 'Karpagam Academy of Higher Education (KAHE – University)', location: 'Coimbatore' },
      { name: 'Sree Sakthi Engineering College (Autonomous)', location: 'Karamadai', code: '2673' },
      { name: 'Adithya Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2744' },
      { name: 'PPG Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2753' },
      { name: 'Rathinam Group of Institutions (Autonomous)', location: 'Coimbatore', code: '2329', note: 'R-Smart / Sunstone supported' },
      { name: 'Dr. NGP Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2736' },
      { name: 'KGISL Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2751' },
      { name: 'Nehru Institute of Engineering and Technology (Autonomous)', location: 'Coimbatore', code: '2729' },
      { name: 'Nehru Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2755' },
      { name: 'Coimbatore Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', code: '2704' },
      { name: 'RVS College of Engineering and Technology (Autonomous)', location: 'Coimbatore', code: '2731' },
      { name: 'United Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2761' },
      { name: 'Hindusthan College of Engineering and Technology (Autonomous)', location: 'Coimbatore', code: '2708' },
      { name: 'Hindustan Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2740' },
      { name: 'Akshaya College of Engineering and Technology (Autonomous)', location: 'Coimbatore', code: '2763' },
      { name: 'INFO Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', code: '2732' },
      { name: 'KIT – Kalaignar Karunanidhi Institute of Technology (Autonomous)', location: 'Coimbatore', code: '2750' },
      { name: 'Dhanalakshmi Srinivasan College of Engineering (Autonomous)', location: 'Coimbatore', code: '2743' },
      { name: 'Sri Ranganathar Institute of Engineering & Technology (Autonomous)', location: 'Athipalayam', code: '2342' },
      { name: 'Study World College of Engineering', location: 'Coimbatore', code: '2770' },
      { name: 'EASA College of Engineering and Technology (Autonomous)', location: 'Coimbatore', code: '2749' },
      { name: 'Arjun College of Technology (Autonomous)', location: 'Coimbatore', code: '2367' },
      { name: 'JCT College of Technology (Autonomous)', location: 'Coimbatore', code: '2762' },
      { name: 'Pollachi Institute of Engineering & Technology', location: 'Pollachi', code: '2354' },
      { name: 'P.A. College of Engineering and Technology (Autonomous)', location: 'Pollachi', code: '2741' },
      { name: 'SNS College of Technology (Autonomous)', location: 'Coimbatore', code: '2726' },
      { name: 'SNS College of Engineering (Autonomous)', location: 'Coimbatore', code: '2734' },
      { name: 'Sri Sai Ranganathan Engineering College', location: 'Thondamuthur', code: '2737' },
      { name: 'Asian College of Engineering and Technology', location: 'Saravanampatti', code: '2338' },
      { name: 'Vishnu Lakshmi College of Engineering and Technology', location: 'Coimbatore', code: '2368' },
      { name: 'Dhaanish Ahmed Institute of Technology', location: 'Coimbatore', code: '2349' },
      { name: 'VSB College of Engineering & Technical Campus', location: 'Coimbatore', code: '2357' },
      { name: 'Park College of Engineering and Technology', location: 'Coimbatore', code: '2716' },
      { name: 'Tamil Nadu College of Engineering', location: 'Coimbatore', code: '2721' },
      { name: 'Sri Shakthi Institute of Engineering and Technology', location: 'L&T By-Pass', code: '2727' },
      { name: 'Kathir College of Engineering', location: 'Coimbatore', code: '2745' },
      { name: 'Suguna College of Engineering', location: 'Coimbatore', code: '2360' },
      { name: 'CMS College of Engineering and Technology', location: 'Coimbatore', code: '2772' },
      { name: 'Christ the King Engineering College', location: 'Karamadai', code: '2650' },
    ]
  },
];

export default function Colleges() {
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
              <div className={`bg-gradient-to-r ${district.color} text-white rounded-2xl p-6 mb-6 shadow-lg`}>
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
                    key={collegeIndex}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${district.color} text-white rounded-lg flex items-center justify-center font-bold text-sm`}>
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
