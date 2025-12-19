import Layout from '@/components/Layout';
import Link from 'next/link';
import { 
  FaGraduationCap, 
  FaUserTie, 
  FaLightbulb, 
  FaHandshake,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaHeart,
  FaEye,
  FaBullseye
} from 'react-icons/fa';

export default function About() {
  const values = [
    {
      icon: FaHeart,
      title: 'Student-Centric',
      description: 'Every decision we make is centered around what\'s best for our students and their future.'
    },
    {
      icon: FaLightbulb,
      title: 'Expert Guidance',
      description: 'Our team of experienced counselors provides informed and personalized advice.'
    },
    {
      icon: FaHandshake,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.'
    },
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide to our students and parents.'
    }
  ];

  const timeline = [
    { year: 'Foundation', event: 'Rasi Foundation was established with a vision to guide students towards successful careers' },
    { year: 'Growth', event: 'Expanded services to cover Medical, Engineering, and Management courses' },
    { year: 'Network', event: 'Built partnerships with 100+ prestigious colleges across India' },
    { year: 'Today', event: 'Successfully guided 5000+ students in achieving their educational dreams' }
  ];

  return (
    <Layout 
      title="About Us" 
      description="Learn about Rasi Foundation - 15+ years of excellence in career guidance. Founded by Prof. P. Gunasekaran, we've helped 5000+ students achieve their educational dreams in Medical, Engineering, MBA & Law."
      keywords="about Rasi Foundation, career guidance Rasipuram, education consultant history, Prof Gunasekaran, career counselor Tamil Nadu"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaGraduationCap />
              <span>About Rasi Foundation</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Shaping <span className="text-red-600">Futures</span>, Building <span className="text-green-600">Dreams</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Rasi Foundation is a premier career guidance and education consultancy dedicated to 
              helping students navigate their educational journey and achieve their professional dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <FaBullseye className="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  To empower students with the knowledge, guidance, and support they need to make 
                  informed career decisions and secure admissions in prestigious institutions that 
                  align with their aspirations and potential.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <FaEye className="text-3xl" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  To be the most trusted and preferred education consultancy, recognized for 
                  transforming lives through quality guidance and creating successful professionals 
                  who contribute to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
              Meet Our <span className="text-green-600">Leaders</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our foundation is led by experienced professionals dedicated to student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Founder */}
            <div className="card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                PG
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Prof. P. Gunasekaran</h3>
              <p className="text-red-600 font-semibold mb-2">Founder</p>
              <p className="text-gray-500 mb-4">M.Sc., M.Phil.</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Career Guidance Advisor & Analyst with extensive experience in the education sector. 
                Prof. Gunasekaran has dedicated his career to helping students find their path to success.
              </p>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <FaPhone className="text-red-600" />
                <a href="tel:+919789446100" className="hover:text-red-600 font-semibold transition-colors">
                  +91 97 89 44 61 00
                </a>
              </div>
            </div>

            {/* Administrative Director */}
            <div className="card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                YK
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">P. Yuvaraj Kumar</h3>
              <p className="text-green-600 font-semibold mb-2">Administrative Director</p>
              <p className="text-gray-500 mb-4">MBA</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Career Guidance Advisor with strong administrative and management skills. 
                Yuvaraj Kumar ensures smooth operations and excellent service delivery to all students.
              </p>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <FaPhone className="text-green-600" />
                <a href="tel:+919294969196" className="hover:text-green-600 font-semibold transition-colors">
                  +91 92 94 96 91 96
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-red-600 font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                The Journey of <span className="text-green-600">Rasi Foundation</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Rasi Foundation was born out of a deep passion for education and a sincere desire 
                to help students navigate the complex world of higher education and career choices.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded by Prof. P. Gunasekaran, a seasoned career guidance expert, the foundation 
                has grown from a small consultancy to a trusted name in education guidance across 
                Tamil Nadu and beyond.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Today, with a team of dedicated professionals and a network of prestigious 
                institutional partners, we continue to fulfill our mission of empowering minds 
                and igniting futures.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <h4 className="text-3xl font-bold text-red-600">5000+</h4>
                  <p className="text-gray-600">Students Guided</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <h4 className="text-3xl font-bold text-green-600">100+</h4>
                  <p className="text-gray-600">Partner Colleges</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-amber-500 to-green-500 rounded-full"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-20 pb-12 last:pb-0">
                  <div className={`absolute left-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-red-500' :
                    index === 1 ? 'bg-orange-500' :
                    index === 2 ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="card p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{item.year}</h4>
                    <p className="text-gray-600">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our core values guide everything we do at Rasi Foundation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-green-500 rounded-2xl flex items-center justify-center">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FaQuoteLeft className="text-5xl mx-auto mb-6 opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-8">
              "Every student has potential. Our job is to help them discover it and guide them 
              towards the right path that will help them shine."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">PG</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Prof. P. Gunasekaran</p>
                <p className="text-white/80">Founder, Rasi Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let us help you make the right career decisions. Contact us for a free counseling session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                Contact Us <FaArrowRight />
              </Link>
              <Link href="/courses" className="btn-outline inline-flex items-center justify-center gap-2">
                View Our Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
