import Layout from '@/components/Layout';
import Link from 'next/link';
import { 
  FaTrophy,
  FaUserGraduate,
  FaUniversity,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaMedal,
  FaAward,
  FaHandshake,
  FaChartLine,
  FaHeart,
  FaUsers,
  FaGraduationCap,
  FaStethoscope,
  FaCog,
  FaBalanceScale
} from 'react-icons/fa';

export default function Achievements() {
  const stats = [
    { icon: FaUserGraduate, number: '5000+', label: 'Students Guided', color: 'red' },
    { icon: FaUniversity, number: '100+', label: 'Partner Colleges', color: 'green' },
    { icon: FaTrophy, number: '15+', label: 'Years of Excellence', color: 'amber' },
    { icon: FaStar, number: '98%', label: 'Satisfaction Rate', color: 'blue' },
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Foundation Established',
      description: 'Rasi Foundation was established with a vision to guide students towards successful careers.',
      icon: FaHeart
    },
    {
      year: '2012',
      title: 'Expanded Services',
      description: 'Extended guidance services to include Medical, Engineering, and Management courses.',
      icon: FaChartLine
    },
    {
      year: '2015',
      title: '1000+ Students Milestone',
      description: 'Successfully guided over 1000 students to secure admissions in prestigious colleges.',
      icon: FaUserGraduate
    },
    {
      year: '2018',
      title: '50+ College Partners',
      description: 'Built strong partnerships with over 50 renowned colleges across India.',
      icon: FaHandshake
    },
    {
      year: '2021',
      title: '3000+ Students Milestone',
      description: 'Reached the milestone of guiding 3000+ students in their educational journey.',
      icon: FaTrophy
    },
    {
      year: '2024',
      title: '5000+ Students & Growing',
      description: 'Proudly serving 5000+ students with 100+ college partnerships nationwide.',
      icon: FaMedal
    }
  ];

  const successStories = [
    {
      name: 'Dr. Arun Kumar',
      achievement: 'MBBS at Government Medical College',
      image: 'AK',
      quote: 'Rasi Foundation was instrumental in my journey to becoming a doctor. Their guidance through NEET preparation and college selection was invaluable.',
      course: 'Medical',
      color: 'red'
    },
    {
      name: 'Priya Venkatesh',
      achievement: 'B.Tech at NIT Trichy',
      image: 'PV',
      quote: 'The expert counseling helped me choose the right engineering branch. Now I am working at a top tech company!',
      course: 'Engineering',
      color: 'blue'
    },
    {
      name: 'Karthik Rajan',
      achievement: 'MBA at IIM Bangalore',
      image: 'KR',
      quote: 'From CAT preparation guidance to interview tips, Rasi Foundation supported me throughout my MBA journey.',
      course: 'Management',
      color: 'green'
    },
    {
      name: 'Divya Sharma',
      achievement: 'LLB at National Law University',
      image: 'DS',
      quote: 'Their knowledge about law schools and CLAT preparation was exceptional. I am now pursuing my dream of becoming a lawyer.',
      course: 'Law',
      color: 'purple'
    },
    {
      name: 'Rajesh Mohan',
      achievement: 'BDS at Dental College',
      image: 'RM',
      quote: 'The personalized attention and accurate information about dental colleges made my admission process smooth.',
      course: 'Medical',
      color: 'red'
    },
    {
      name: 'Anitha Krishnan',
      achievement: 'B.Ed at Government College',
      image: 'AN',
      quote: 'Rasi Foundation helped me understand the teaching profession better and secured my admission in a top college.',
      course: 'Education',
      color: 'amber'
    }
  ];

  const recognitions = [
    {
      title: 'Best Education Consultancy',
      description: 'Recognized for excellence in career guidance services',
      icon: FaTrophy
    },
    {
      title: 'Student Choice Award',
      description: 'Voted as the most trusted consultancy by students',
      icon: FaStar
    },
    {
      title: 'Community Service Excellence',
      description: 'Awarded for contribution to educational empowerment',
      icon: FaAward
    },
    {
      title: 'Quality Service Certificate',
      description: 'Certified for maintaining high service standards',
      icon: FaMedal
    }
  ];

  const placementHighlights = [
    { category: 'Medical', placements: '800+', icon: FaStethoscope, color: 'red' },
    { category: 'Engineering', placements: '1500+', icon: FaCog, color: 'blue' },
    { category: 'Management', placements: '1200+', icon: FaChartLine, color: 'green' },
    { category: 'Law', placements: '500+', icon: FaBalanceScale, color: 'purple' },
    { category: 'Education', placements: '600+', icon: FaGraduationCap, color: 'amber' },
    { category: 'Others', placements: '400+', icon: FaUsers, color: 'teal' }
  ];

  return (
    <Layout title="Achievements" description="Discover the success stories and milestones of Rasi Foundation. See how we have helped thousands of students achieve their dreams.">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaTrophy />
              <span>Our Achievements</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Celebrating <span className="text-amber-600">Success</span> Stories
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Over the years, Rasi Foundation has helped thousands of students achieve their 
              educational dreams. Here's a glimpse of our journey and accomplishments.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  stat.color === 'red' ? 'bg-red-100 group-hover:bg-red-600' :
                  stat.color === 'green' ? 'bg-green-100 group-hover:bg-green-600' :
                  stat.color === 'amber' ? 'bg-amber-100 group-hover:bg-amber-600' :
                  'bg-blue-100 group-hover:bg-blue-600'
                }`}>
                  <stat.icon className={`text-3xl transition-colors duration-300 ${
                    stat.color === 'red' ? 'text-red-600 group-hover:text-white' :
                    stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
                    stat.color === 'amber' ? 'text-amber-600 group-hover:text-white' :
                    'text-blue-600 group-hover:text-white'
                  }`} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-red-600 font-semibold uppercase tracking-wider">Placement Stats</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Category-wise <span className="text-green-600">Placements</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {placementHighlights.map((item, index) => (
              <div key={index} className="card p-6 text-center card-hover">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  item.color === 'red' ? 'bg-red-100' :
                  item.color === 'blue' ? 'bg-blue-100' :
                  item.color === 'green' ? 'bg-green-100' :
                  item.color === 'purple' ? 'bg-purple-100' :
                  item.color === 'amber' ? 'bg-amber-100' :
                  'bg-teal-100'
                }`}>
                  <item.icon className={`text-2xl ${
                    item.color === 'red' ? 'text-red-600' :
                    item.color === 'blue' ? 'text-blue-600' :
                    item.color === 'green' ? 'text-green-600' :
                    item.color === 'purple' ? 'text-purple-600' :
                    item.color === 'amber' ? 'text-amber-600' :
                    'text-teal-600'
                  }`} />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">{item.placements}</h4>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Key <span className="text-green-600">Milestones</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-amber-500 to-green-500 rounded-full hidden md:block"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="card p-6 card-hover">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${
                        index === 0 ? 'bg-red-100 text-red-600' :
                        index === 1 ? 'bg-orange-100 text-orange-600' :
                        index === 2 ? 'bg-amber-100 text-amber-600' :
                        index === 3 ? 'bg-lime-100 text-lime-600' :
                        index === 4 ? 'bg-green-100 text-green-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-amber-500' :
                      index === 3 ? 'bg-lime-500' :
                      index === 4 ? 'bg-green-500' :
                      'bg-emerald-500'
                    }`}>
                      <milestone.icon />
                    </div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Our Students, Our Pride
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real stories from real students who achieved their dreams with our guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <FaQuoteLeft className="text-2xl text-amber-400 mb-4" />
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    story.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-700' :
                    story.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                    story.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-700' :
                    story.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                    'bg-gradient-to-br from-amber-500 to-amber-700'
                  }`}>
                    {story.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{story.name}</h4>
                    <p className={`text-sm ${
                      story.color === 'red' ? 'text-red-400' :
                      story.color === 'blue' ? 'text-blue-400' :
                      story.color === 'green' ? 'text-green-400' :
                      story.color === 'purple' ? 'text-purple-400' :
                      'text-amber-400'
                    }`}>{story.achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold uppercase tracking-wider">Recognition</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Awards & <span className="text-green-600">Accolades</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recognitions.map((item, index) => (
              <div key={index} className="card p-6 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <item.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be Our Next Success Story!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the thousands of students who have achieved their dreams with Rasi Foundation. 
            Your success story could be next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-amber-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Start Your Journey <FaArrowRight />
            </Link>
            <Link href="/courses" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
