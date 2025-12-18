import Layout from '@/components/Layout';
import Link from 'next/link';
import { 
  FaGraduationCap, 
  FaUserGraduate, 
  FaAward, 
  FaHandshake,
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaChartLine,
  FaPaintBrush,
  FaSeedling,
  FaChalkboardTeacher,
  FaFlask,
  FaArrowRight,
  FaPhone,
  FaQuoteLeft,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

export default function Home() {
  const stats = [
    { icon: FaUserGraduate, number: '5000+', label: 'Students Guided', color: 'red' },
    { icon: FaGraduationCap, number: '50+', label: 'Courses Offered', color: 'green' },
    { icon: FaAward, number: '15+', label: 'Years Experience', color: 'amber' },
    { icon: FaHandshake, number: '100+', label: 'Partner Colleges', color: 'blue' },
  ];

  const featuredCourses = [
    { icon: FaStethoscope, name: 'Medical Sciences', courses: ['MBBS', 'BDS', 'AYUSH', 'Para Medical'], color: 'red' },
    { icon: FaCog, name: 'Engineering', courses: ['B.E/B.Tech', 'Polytechnic', 'Architecture'], color: 'blue' },
    { icon: FaChartLine, name: 'Management', courses: ['MBA', 'MCA', 'CA', 'B.Com'], color: 'green' },
    { icon: FaBalanceScale, name: 'Law', courses: ['BL', 'LLB', 'LLM'], color: 'purple' },
    { icon: FaChalkboardTeacher, name: 'Education', courses: ['B.Ed', 'M.Ed', 'D.T.Ed'], color: 'amber' },
    { icon: FaFlask, name: 'Arts & Science', courses: ['BA', 'BSc', 'MA', 'MSc'], color: 'teal' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'MBBS Student',
      text: 'Rasi Foundation helped me find the perfect medical college. Their guidance was invaluable!',
      rating: 5
    },
    {
      name: 'Karthik R.',
      course: 'Engineering Graduate',
      text: 'Professional and dedicated team. They made my admission process smooth and stress-free.',
      rating: 5
    },
    {
      name: 'Anitha M.',
      course: 'MBA Student',
      text: 'Excellent career counseling! They understood my goals and suggested the best options.',
      rating: 5
    }
  ];

  const colorClasses = {
    red: 'bg-red-100 text-red-600 group-hover:bg-red-600',
    green: 'bg-green-100 text-green-600 group-hover:bg-green-600',
    amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600',
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
    purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600',
    teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600',
  };

  return (
    <Layout title="Home" description="Rasi Foundation - Your trusted partner in career guidance and education consultancy. Empowering minds, Igniting future!">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaGraduationCap />
                <span>Career Guidance & Education Consultancy</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                <span className="text-red-600">Empowering</span> Minds!
                <br />
                <span className="text-green-600">Igniting</span> Future!
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Your trusted partner in shaping successful careers. We provide expert guidance 
                for admissions in top colleges across India for Medical, Engineering, Management, 
                Law, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/courses" className="btn-primary flex items-center justify-center gap-2">
                  Explore Courses <FaArrowRight />
                </Link>
                <Link href="/contact" className="btn-outline flex items-center justify-center gap-2">
                  <FaPhone /> Get Free Counseling
                </Link>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Call Now</p>
                    <a href="tel:+919789446100" className="font-bold text-gray-800 hover:text-red-600">
                      +91 97 89 44 61 00
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image/Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                {/* Decorative Cards */}
                <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-2xl p-6 animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                      <FaStethoscope className="text-2xl text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Medical Courses</p>
                      <p className="text-sm text-gray-500">MBBS, BDS, AYUSH</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-32 left-0 bg-white rounded-2xl shadow-2xl p-6 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCog className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Engineering</p>
                      <p className="text-sm text-gray-500">B.E, B.Tech, Arch</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 right-10 bg-white rounded-2xl shadow-2xl p-6 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <FaChartLine className="text-2xl text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Management</p>
                      <p className="text-sm text-gray-500">MBA, MCA, CA</p>
                    </div>
                  </div>
                </div>

                {/* Central Illustration */}
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-red-500 via-amber-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                    <FaGraduationCap className="text-9xl text-gray-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
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

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-red-600 font-semibold uppercase tracking-wider">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                Your Trusted Partner in <span className="text-green-600">Education</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Rasi Foundation is a premier career guidance and education consultancy founded by 
                <strong> Prof. P. Gunasekaran (M.Sc., M.Phil.)</strong>, a renowned Career Guidance 
                Advisor & Analyst with decades of experience in the education sector.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Led by Administrative Director <strong>P. Yuvaraj Kumar (MBA)</strong>, our team is 
                dedicated to helping students make informed decisions about their careers and secure 
                admissions in prestigious institutions.
              </p>

              <div className="space-y-4 mb-8">
                {['Expert Career Counseling', 'Admission Assistance', 'Scholarship Guidance', 'Documentation Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us <FaArrowRight />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white">
                <FaQuoteLeft className="text-4xl text-red-300 mb-4" />
                <p className="text-xl italic leading-relaxed mb-6">
                  "Education is the most powerful weapon which you can use to change the world. 
                  At Rasi Foundation, we are committed to guiding every student towards their dreams."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-red-600">PG</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Prof. P. Gunasekaran</p>
                    <p className="text-red-200">Founder, M.Sc., M.Phil.</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold uppercase tracking-wider">Our Courses</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
              Courses We <span className="text-green-600">Offer</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide guidance and admission assistance for a wide range of professional courses 
              in top colleges across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={index} className="card card-hover group p-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses[course.color]} group-hover:text-white`}>
                  <course.icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{course.name}</h3>
                <ul className="space-y-2 mb-6">
                  {course.courses.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className={`w-2 h-2 rounded-full ${
                        course.color === 'red' ? 'bg-red-500' :
                        course.color === 'green' ? 'bg-green-500' :
                        course.color === 'amber' ? 'bg-amber-500' :
                        course.color === 'blue' ? 'bg-blue-500' :
                        course.color === 'purple' ? 'bg-purple-500' :
                        'bg-teal-500'
                      }`}></span>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className={`inline-flex items-center gap-2 font-semibold transition-colors ${
                  course.color === 'red' ? 'text-red-600 hover:text-red-700' :
                  course.color === 'green' ? 'text-green-600 hover:text-green-700' :
                  course.color === 'amber' ? 'text-amber-600 hover:text-amber-700' :
                  course.color === 'blue' ? 'text-blue-600 hover:text-blue-700' :
                  course.color === 'purple' ? 'text-purple-600 hover:text-purple-700' :
                  'text-teal-600 hover:text-teal-700'
                }`}>
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-secondary inline-flex items-center gap-2">
              View All Courses <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-300 font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Your Success is Our Mission
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              We go beyond just admission assistance. Our comprehensive approach ensures 
              your educational journey is smooth and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Expert Guidance', desc: 'Personalized counseling by experienced professionals', icon: FaUserGraduate },
              { title: 'Wide Network', desc: 'Partnerships with 100+ top colleges across India', icon: FaHandshake },
              { title: 'Complete Support', desc: 'From course selection to admission completion', icon: FaCheckCircle },
              { title: 'Proven Track Record', desc: '5000+ students successfully guided', icon: FaAward },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <item.icon className="text-3xl text-amber-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
              What Our <span className="text-green-600">Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Shape Your Future?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get expert career guidance and secure admission in your dream college. 
                Contact us today for a free counseling session!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                  <FaPhone /> Get Free Counseling
                </Link>
                <a href="tel:+919789446100" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  Call: +91 97 89 44 61 00
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
