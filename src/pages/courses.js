import Layout from '@/components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaChartLine,
  FaPaintBrush,
  FaSeedling,
  FaChalkboardTeacher,
  FaFlask,
  FaGraduationCap,
  FaArrowRight,
  FaPhone,
  FaSearch,
  FaFilter,
  FaHospital,
  FaLaptopCode,
  FaBuilding,
  FaCalculator,
  FaBook,
  FaLeaf,
  FaCheckCircle,
  FaClock,
  FaUsers
} from 'react-icons/fa';

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: FaGraduationCap },
    { id: 'medical', name: 'Medical', icon: FaStethoscope },
    { id: 'engineering', name: 'Engineering', icon: FaCog },
    { id: 'management', name: 'Management', icon: FaChartLine },
    { id: 'law', name: 'Law', icon: FaBalanceScale },
    { id: 'education', name: 'Education', icon: FaChalkboardTeacher },
    { id: 'arts', name: 'Arts & Science', icon: FaFlask },
    { id: 'agriculture', name: 'Agriculture', icon: FaSeedling },
  ];

  const courses = [
    // Medical Courses
    {
      id: 1,
      name: 'MBBS',
      fullName: 'Bachelor of Medicine, Bachelor of Surgery',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Become a qualified medical doctor with this comprehensive undergraduate medical degree.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 2,
      name: 'BDS',
      fullName: 'Bachelor of Dental Surgery',
      category: 'medical',
      duration: '5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Pursue a career in dentistry and oral healthcare with this professional degree.',
      icon: FaStethoscope,
      color: 'red'
    },
    {
      id: 3,
      name: 'AYUSH',
      fullName: 'Ayurveda, Yoga, Naturopathy, Unani, Siddha, Homeopathy',
      category: 'medical',
      duration: '4.5-5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Explore traditional Indian medicine systems and alternative healthcare.',
      icon: FaLeaf,
      color: 'red'
    },
    {
      id: 4,
      name: 'Para Medical Courses',
      fullName: 'Allied Health Sciences',
      category: 'medical',
      duration: '2-4 years',
      eligibility: '10+2 with Science',
      description: 'Various courses including Nursing, Pharmacy, Lab Technology, Physiotherapy, etc.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 5,
      name: 'AHS',
      fullName: 'Allied Health Sciences',
      category: 'medical',
      duration: '3-4 years',
      eligibility: '10+2 with Science',
      description: 'Bachelor programs in various allied health specializations.',
      icon: FaStethoscope,
      color: 'red'
    },

    // Engineering Courses
    {
      id: 6,
      name: 'B.E / B.Tech',
      fullName: 'Bachelor of Engineering / Technology',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, JEE/State Entrance',
      description: 'Undergraduate engineering degree in various specializations like CSE, ECE, Mechanical, Civil, etc.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 7,
      name: 'Architecture',
      fullName: 'Bachelor of Architecture (B.Arch)',
      category: 'engineering',
      duration: '5 years',
      eligibility: '10+2 with Maths, NATA Qualified',
      description: 'Design buildings and spaces with this professional architecture degree.',
      icon: FaBuilding,
      color: 'blue'
    },
    {
      id: 8,
      name: 'Polytechnic',
      fullName: 'Diploma in Engineering',
      category: 'engineering',
      duration: '3 years',
      eligibility: '10th Pass',
      description: 'Technical diploma courses in various engineering branches.',
      icon: FaLaptopCode,
      color: 'blue'
    },

    // Management Courses
    {
      id: 9,
      name: 'MBA',
      fullName: 'Master of Business Administration',
      category: 'management',
      duration: '2 years',
      eligibility: 'Any Degree, CAT/MAT/TANCET',
      description: 'Advanced management degree with various specializations like Finance, Marketing, HR, etc.',
      icon: FaChartLine,
      color: 'green'
    },
    {
      id: 10,
      name: 'MCA',
      fullName: 'Master of Computer Applications',
      category: 'management',
      duration: '2 years',
      eligibility: 'BCA or Any Degree with Maths',
      description: 'Advanced computer science and applications program.',
      icon: FaLaptopCode,
      color: 'green'
    },
    {
      id: 11,
      name: 'Chartered Accountancy',
      fullName: 'CA (Chartered Accountant)',
      category: 'management',
      duration: '3-5 years',
      eligibility: '10+2 Pass',
      description: 'Prestigious professional course in accounting, taxation, and finance.',
      icon: FaCalculator,
      color: 'green'
    },

    // Law Courses
    {
      id: 12,
      name: 'BL / LLB',
      fullName: 'Bachelor of Law',
      category: 'law',
      duration: '3-5 years',
      eligibility: 'Any Degree / 10+2 for Integrated',
      description: 'Pursue a career in legal profession with this law degree.',
      icon: FaBalanceScale,
      color: 'purple'
    },

    // Education Courses
    {
      id: 13,
      name: 'B.Ed',
      fullName: 'Bachelor of Education',
      category: 'education',
      duration: '2 years',
      eligibility: 'Any Degree',
      description: 'Become a qualified teacher with this professional education degree.',
      icon: FaChalkboardTeacher,
      color: 'amber'
    },
    {
      id: 14,
      name: 'M.Ed',
      fullName: 'Master of Education',
      category: 'education',
      duration: '2 years',
      eligibility: 'B.Ed Degree',
      description: 'Advanced degree in education for teaching and research.',
      icon: FaBook,
      color: 'amber'
    },
    {
      id: 15,
      name: 'D.T.Ed',
      fullName: 'Diploma in Teacher Education',
      category: 'education',
      duration: '2 years',
      eligibility: '10+2 Pass',
      description: 'Diploma course for primary school teaching.',
      icon: FaChalkboardTeacher,
      color: 'amber'
    },

    // Arts & Science
    {
      id: 16,
      name: 'Arts & Science',
      fullName: 'BA, BSc, BCom, MA, MSc, MCom',
      category: 'arts',
      duration: '3-5 years',
      eligibility: '10+2 Pass',
      description: 'Various undergraduate and postgraduate programs in arts, science, and commerce.',
      icon: FaFlask,
      color: 'teal'
    },

    // Agriculture
    {
      id: 17,
      name: 'Agriculture',
      fullName: 'B.Sc Agriculture / Agricultural Engineering',
      category: 'agriculture',
      duration: '4 years',
      eligibility: '10+2 with PCB/PCM',
      description: 'Study agricultural sciences and contribute to food security.',
      icon: FaSeedling,
      color: 'emerald'
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const colorClasses = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-400'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-400'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-400'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
      hover: 'hover:border-amber-400'
    },
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-600',
      border: 'border-teal-200',
      hover: 'hover:border-teal-400'
    },
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      hover: 'hover:border-emerald-400'
    }
  };

  return (
    <Layout 
      title="Courses" 
      description="Explore 50+ courses: MBBS, BDS, B.Tech, MBA, LLB, B.Ed & more. Rasi Foundation provides expert admission guidance for Medical, Engineering, Management, Law courses in Tamil Nadu."
      keywords="MBBS course admission, engineering courses Tamil Nadu, MBA admission guidance, law courses India, B.Ed admission, NEET coaching, medical courses, polytechnic admission"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaGraduationCap />
              <span>Course Offerings</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Explore Our <span className="text-green-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We provide guidance and admission assistance for a comprehensive range of professional 
              courses in top colleges across India.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a course..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="text-sm" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className={`card p-6 border-2 ${colorClasses[course.color].border} ${colorClasses[course.color].hover} transition-all duration-300 card-hover`}
                >
                  <div className={`w-14 h-14 rounded-xl ${colorClasses[course.color].bg} ${colorClasses[course.color].text} flex items-center justify-center mb-4`}>
                    <course.icon className="text-2xl" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.name}</h3>
                  <p className={`text-sm ${colorClasses[course.color].text} font-medium mb-3`}>{course.fullName}</p>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className={colorClasses[course.color].text} />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <FaCheckCircle className={`${colorClasses[course.color].text} mt-0.5 flex-shrink-0`} />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </div>
                  </div>

                  <Link 
                    href="/contact" 
                    className={`inline-flex items-center gap-2 font-semibold ${colorClasses[course.color].text} hover:underline`}
                  >
                    Enquire Now <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* All Courses Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Complete Course List
            </h2>
            <p className="text-gray-600 text-lg">
              A comprehensive overview of all courses we provide guidance for
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['MBBS', 'AYUSH', 'BDS', 'Para Medical Courses', 'AHS', 'Engineering', 
                'Architecture', 'Chartered Accountancy', 'MBA', 'MCA', 'Polytechnic', 
                'B.Ed', 'M.Ed', 'D.T.Ed', 'Agriculture', 'BL', 'LLB', 'Arts & Science'].map((course, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-700">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Rasi Foundation for Your Education?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FaUsers, title: 'Expert Counselors', desc: 'Experienced team to guide you through every step' },
              { icon: FaGraduationCap, title: '100+ Partner Colleges', desc: 'Wide network of prestigious institutions' },
              { icon: FaCheckCircle, title: 'Complete Support', desc: 'From course selection to admission' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <item.icon className="text-4xl mx-auto mb-4 text-amber-300" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Need Help Choosing the Right Course?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our expert counselors are here to help you make the best decision for your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                Get Free Counseling <FaArrowRight />
              </Link>
              <a href="tel:+919789446100" className="btn-secondary inline-flex items-center justify-center gap-2">
                <FaPhone /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
